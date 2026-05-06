/**
 * lenisStore.ts
 *
 * A module-level singleton that holds the global Lenis instance.
 * This lets any component (e.g. GSAP pages) access the already-running
 * Lenis without creating a second conflicting instance.
 *
 * Usage:
 *   import { getLenis } from "@/lib/lenisStore";
 *   const lenis = getLenis(); // may be null before SmoothScroll mounts
 */

import type Lenis from "lenis";

let _lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null): void {
  _lenis = instance;
}

export function getLenis(): Lenis | null {
  return _lenis;
}
