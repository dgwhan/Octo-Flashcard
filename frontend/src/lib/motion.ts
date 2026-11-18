/**
 * Motion primitives (Part 2.7). Durations/easing mirror the tokens in src/styles/colors.css.
 * Web Animations are used for the card flip so that only a user's flip animates —
 * switching cards snaps instantly and never reveals the next card's answer mid-turn.
 */

export const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
export const EASE_FLIP = "cubic-bezier(0.65, 0, 0.35, 1)";
export const DUR_FLIP = 620;

// Resolve a token once per call; keyframes get plain values (var() in WAAPI keyframes is not universal).
function token(el: Element, name: string, fallback: string) {
  return getComputedStyle(el).getPropertyValue(name).trim() || fallback;
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Signature flip: the tilted card straightens and lifts at the half-turn, then settles tilted again.
 * `inner` carries rotateY; `scene` carries the tilt + lift. Final resting transforms stay in CSS.
 */
export function flipCard(inner: HTMLElement | null, scene: HTMLElement | null, toBack: boolean) {
  if (!inner || prefersReducedMotion()) return;
  const from = toBack ? 0 : 180;
  const to = toBack ? 180 : 360; // keep turning the same way instead of rewinding
  inner.animate(
    [{ transform: `rotateY(${from}deg)` }, { transform: `rotateY(${to}deg)` }],
    { duration: DUR_FLIP, easing: EASE_FLIP }
  );
  if (!scene) return;
  const tilt = token(scene, "--card-tilt-rest", "-1deg");
  scene.animate(
    [
      { transform: `rotate(${tilt}) translateY(0) scale(1)` },
      { transform: "rotate(0deg) translateY(-10px) scale(1.035)", offset: 0.45 },
      { transform: `rotate(${tilt}) translateY(0) scale(1)` },
    ],
    { duration: DUR_FLIP, easing: EASE_OUT }
  );
}

/** A new card is dealt in from the side we are moving toward. */
export function dealCard(scene: HTMLElement | null, direction: 1 | -1) {
  if (!scene || prefersReducedMotion()) return;
  const tilt = token(scene, "--card-tilt-rest", "-1deg");
  scene.animate(
    [
      { transform: `translateX(${direction * 28}px) rotate(${direction * 2}deg)`, opacity: 0 },
      { transform: `translateX(0) rotate(${tilt})`, opacity: 1 },
    ],
    { duration: 280, easing: EASE_OUT }
  );
}

/** The one gold moment: a quick ring when a card is marked as mastered. */
export function goldTick(el: HTMLElement | null) {
  if (!el || prefersReducedMotion()) return;
  const gold = token(el, "--color-gold", "#e4b73a");
  // Easing per segment (not over the whole timeline) so the gold peak is held long enough to see.
  el.animate(
    [
      { boxShadow: `0 0 0 0 ${gold}`, transform: "scale(1)", easing: EASE_OUT },
      { boxShadow: `0 0 0 3px ${gold}`, transform: "scale(1.08)", offset: 0.25, easing: "linear" },
      { boxShadow: `0 0 0 3px ${gold}`, transform: "scale(1.08)", offset: 0.6, easing: EASE_OUT },
      { boxShadow: `0 0 0 0 transparent`, transform: "scale(1)" },
    ],
    { duration: 720 }
  );
}
