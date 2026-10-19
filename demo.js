// The website simulates progress only; no network transfers are made.
export function advance(progress, paused, amount = 0.75) {
  return paused ? progress : Math.min(100, progress + amount);
}
