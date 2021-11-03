import useDebouncedCallback from "use-debounce/lib/useDebouncedCallback";
import type {
  ControlFunctions,
  DebouncedState,
} from "use-debounce/lib/useDebouncedCallback";

export type { ControlFunctions, DebouncedState };
/**
 * useDebouncedCallback
 *
 * @param callback function
 * @param delay number
 * @param options maxWait, leading, trailing
 *
 */
export default useDebouncedCallback;
