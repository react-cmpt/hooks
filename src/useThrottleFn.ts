import {
  useThrottleFn,
  ThrottleFnOptions,
  ThrottleReturnResult,
} from "@react-cmpt/use-throttle";

export type { ThrottleFnOptions, ThrottleReturnResult };

/**
 * useThrottleFn
 *
 * @param fn function
 * @param wait number @default 0
 * @param options object
 */
export default useThrottleFn;
