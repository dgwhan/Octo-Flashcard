import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/** Minimal Storage so the store can run under Node. */
class MemoryStorage {
  private data = new Map<string, string>();
  getItem = (k: string) => this.data.get(k) ?? null;
  setItem = (k: string, v: string) => void this.data.set(k, v);
  removeItem = (k: string) => void this.data.delete(k);
}

const api = vi.hoisted(() => ({
  token: null as string | null,
  get: vi.fn(),
  put: vi.fn(),
}));

vi.mock("./api", () => ({
  getAuthToken: () => api.token,
  apiClient: { get: api.get, put: api.put, delete: vi.fn() },
}));

const flush = () => new Promise((r) => setTimeout(r, 0));

describe("userSettings store", () => {
  beforeEach(() => {
    vi.resetModules();
    api.token = null;
    api.get.mockReset();
    api.put.mockReset();
    vi.stubGlobal("window", {});
    vi.stubGlobal("localStorage", new MemoryStorage());
    vi.stubGlobal("sessionStorage", new MemoryStorage());
  });
  afterEach(() => vi.unstubAllGlobals());

  it("signed out: uses this device's voice and never calls the server", async () => {
    localStorage.setItem("octo_speaking_voice", "kokoro:af_bella");
    const { getUserSettings, updateUserSettings } = await import("./userSettings");
    expect(getUserSettings().voice).toBe("kokoro:af_bella");
    expect(getUserSettings().hasGeminiKey).toBe(false);
    await updateUserSettings({ voice: "browser:Aria" });
    expect(localStorage.getItem("octo_speaking_voice")).toBe("browser:Aria");
    expect(api.get).not.toHaveBeenCalled();
  });

  it("signed in: loads from the server, wipes keys left in the browser, migrates the device voice once", async () => {
    api.token = "t1";
    localStorage.setItem("octo_gemini_key", "AIza-old-key-in-browser");
    sessionStorage.setItem("octo_gemini_key", "AIza-old-key-in-session");
    localStorage.setItem("octo_speaking_voice", "kokoro:af_heart");
    const server = { hasGeminiKey: true, geminiKeyHint: "AIza…1234", geminiModel: "m", voice: "", voiceSpeed: 1 };
    api.get.mockResolvedValue(server);
    api.put.mockResolvedValue({ ...server, voice: "kokoro:af_heart" });

    const { getUserSettings } = await import("./userSettings");
    getUserSettings();
    await flush();

    expect(localStorage.getItem("octo_gemini_key")).toBeNull();
    expect(sessionStorage.getItem("octo_gemini_key")).toBeNull();
    expect(api.put).toHaveBeenCalledWith("/settings", { voice: "kokoro:af_heart" });
    expect(getUserSettings()).toMatchObject({ hasGeminiKey: true, geminiKeyHint: "AIza…1234", voice: "kokoro:af_heart" });
  });

  it("rolls back an optimistic change when the server rejects it", async () => {
    api.token = "t1";
    api.get.mockResolvedValue({ hasGeminiKey: false, geminiKeyHint: null, geminiModel: "m", voice: "gemini:Kore", voiceSpeed: 1 });
    api.put.mockRejectedValue(new Error("Giọng đọc không hợp lệ."));
    const { getUserSettings, updateUserSettings } = await import("./userSettings");
    getUserSettings();
    await flush();
    await expect(updateUserSettings({ voice: "kokoro:af_bella" })).rejects.toThrow("Giọng đọc không hợp lệ.");
    expect(getUserSettings().voice).toBe("gemini:Kore");
  });
});
