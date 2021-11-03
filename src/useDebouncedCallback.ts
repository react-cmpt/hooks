import { useDebouncedCallback } from "use-debounce";
import type {
  ControlFunctions,
  DebouncedState,
  Options,
} from "use-debounce/lib/useDebouncedCallback";

export type DebouncedOptions = Options;
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
