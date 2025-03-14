import { createSignal } from 'solid-js';

/**
 * Creates an acceleration function that increases a multiplier when called in rapid succession.
 * The faster the returned function is invoked, the higher the multiplier grows.
 *
 * @param {number} [baseIncrement=0.1] - The minimum multiplier when calls are infrequent.
 * @param {number} [timeout=100] - The time threshold (in milliseconds) after which the multiplier resets to the base increment.
 * @returns {() => number} - A function that, when called, returns a dynamically adjusted multiplier based on call frequency.
 */
export function createAcceleration(
  baseIncrement = 0.1,
  timeout = 100
): () => number {
  const [lastTime, setLastTime] = createSignal(0);

  return () => {
    const now = Date.now();
    const diff = now - lastTime();

    setLastTime(now);

    if (diff > timeout) {
      return baseIncrement;
    } else if (diff < 1) {
      // Handles really small values (decimals, zero, and negatives)
      return baseIncrement;
    } else {
      return Math.pow(timeout / diff, 2) * baseIncrement;
    }
  };
}
