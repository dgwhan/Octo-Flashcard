"use client";

/**
 * The signed-in user's settings (Gemini key status, model, voice, voice speed), kept on the server so they
 * follow the account across devices. The Gemini key itself never reaches the browser: only `hasGeminiKey`
 * and a masked hint. Signed out, the voice choice is kept on this device only.
 */
import { useSyncExternalStore } from "react";
import { apiClient, getAuthToken } from "./api";

export interface UserSettings {
  hasGeminiKey: boolean;
  geminiKeyHint: string | null;
  geminiModel: string;
  voice: string;
  voiceSpeed: number;
}

export interface UserSettingsState {
  status: "anonymous" | "loading" | "ready" | "error";
  settings: UserSettings;
}

const LOCAL_VOICE = "octo_speaking_voice";
const LOCAL_SPEED = "octo_voice_speed";
// Earlier versions kept the Gemini key in the browser; wipe any copy left behind
const LEGACY_KEYS = ["octo_gemini_key", "octo_gemini_model"];

export const DEFAULT_SETTINGS: UserSettings = {
  hasGeminiKey: false,
  geminiKeyHint: null,
  geminiModel: "",
  voice: "",
  voiceSpeed: 1,
};

const SERVER_STATE: UserSettingsState = { status: "anonymous", settings: DEFAULT_SETTINGS };

const readLocal = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const writeLocal = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // storage blocked (private mode): the choice lasts for this page view only
  }
};

const deviceSettings = (): UserSettings => ({
  ...DEFAULT_SETTINGS,
  voice: readLocal(LOCAL_VOICE) ?? "",
  voiceSpeed: Number(readLocal(LOCAL_SPEED)) || 1,
});

let state: UserSettingsState = SERVER_STATE;
let loadedFor: string | null = null; // token the current state belongs to
let inflight: Promise<void> | null = null;
const listeners = new Set<() => void>();

function emit(next: UserSettingsState) {
  state = next;
  listeners.forEach((l) => l());
}

function purgeLegacy() {
  for (const store of [localStorage, sessionStorage]) {
    for (const key of LEGACY_KEYS) {
      try {
        store.removeItem(key);
      } catch {
        // ignore
      }
    }
  }
}

/** Load (or reload after sign-in / sign-out) the settings for whoever is signed in now. */
export function ensureUserSettings(force = false) {
  if (typeof window === "undefined") return;
  const token = getAuthToken();
  if (!token) {
    loadedFor = null;
    if (state.status !== "anonymous" || force) emit({ status: "anonymous", settings: deviceSettings() });
    else if (state === SERVER_STATE) emit({ status: "anonymous", settings: deviceSettings() });
    return;
  }
  if (!force && loadedFor === token && (state.status === "ready" || inflight)) return;
  loadedFor = token;
  purgeLegacy();
  emit({ status: "loading", settings: state.settings });
  inflight = apiClient
    .get<UserSettings>("/settings")
    .then(async (s) => {
      // Carry a voice chosen before signing in over to the account, once
      const local = readLocal(LOCAL_VOICE);
      if (!s.voice && local) s = await apiClient.put<UserSettings>("/settings", { voice: local }).catch(() => s);
      emit({ status: "ready", settings: s });
    })
    .catch(() => emit({ status: "error", settings: deviceSettings() }))
    .finally(() => {
      inflight = null;
    });
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  ensureUserSettings();
  return () => {
    listeners.delete(listener);
  };
};

export const useUserSettings = () => useSyncExternalStore(subscribe, () => state, () => SERVER_STATE);

/** Synchronous read for non-React code (the voice engine). */
export function getUserSettings(): UserSettings {
  ensureUserSettings();
  return state.settings;
}

export async function updateUserSettings(patch: Partial<Pick<UserSettings, "voice" | "voiceSpeed" | "geminiModel">>) {
  if (state.status === "anonymous") {
    if (patch.voice !== undefined) writeLocal(LOCAL_VOICE, patch.voice);
    if (patch.voiceSpeed !== undefined) writeLocal(LOCAL_SPEED, String(patch.voiceSpeed));
    emit({ ...state, settings: { ...state.settings, ...patch } });
    return;
  }
  const previous = state;
  emit({ ...state, settings: { ...state.settings, ...patch } }); // optimistic: the picker reacts at once
  try {
    emit({ status: "ready", settings: await apiClient.put<UserSettings>("/settings", patch) });
  } catch (err) {
    emit(previous);
    throw err;
  }
}

/** The server checks the key with Google before storing it encrypted. */
export async function saveGeminiKey(apiKey: string, model?: string) {
  const s = await apiClient.put<UserSettings>("/settings/gemini-key", { apiKey: apiKey.trim(), model: model?.trim() || undefined });
  emit({ status: "ready", settings: s });
}

export async function removeGeminiKey() {
  emit({ status: "ready", settings: await apiClient.delete<UserSettings>("/settings/gemini-key") });
}
