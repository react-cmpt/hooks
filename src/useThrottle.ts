import type {
  ThrottleOptions,
  ControlFunctions,
} from "@react-cmpt/use-throttle";
import { useThrottle } from "@react-cmpt/use-throttle";

export type { ThrottleOptions, ControlFunctions };

/**
 * useThrottle
 *
 * @param value
 * @param wait number @default 0
 * @param options object
 */
export default useThrottle;
