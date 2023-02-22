import useAsyncClick from "./useAsyncClick";
import type { ControlFunctions } from "./useDebouncedCallback";
import useDebouncedCallback from "./useDebouncedCallback";

// [type patch] https://github.com/xnimorz/use-debounce/pull/158
export type ClickDebouncedState<T extends (...args: any) => any> = ((
  ...args: Parameters<T>
) => Promise<void>) &
  ControlFunctions;

export type ReturnResult<T extends (...args: any[]) => any> = {
  callback: ClickDebouncedState<T>;
  loading: boolean;
  error: Error | undefined;
};

/**
 * useDebouncedClick
 *
 * @param asyncFunc
 * @param wait number @default 0
 * @param options maxWait, leading, trailing
 */
export default function useDebouncedClick<T extends (...args: any[]) => any>(
  asyncFunc: T,
  wait = 0,
  options?: { maxWait?: number; leading?: boolean; trailing?: boolean }
): ReturnResult<T> {
  const { callback, loading, error } = useAsyncClick<
    ReturnType<T>,
    Parameters<T>
  >(asyncFunc);

  const onClickEvent = useDebouncedCallback<(...args: any[]) => Promise<void>>(
    async (...args: any[]) => {
      await callback(...(args as Parameters<T>));
    },
    wait,
    options
  );

  return {
    callback: onClickEvent as ClickDebouncedState<T>,
    loading,
    error,
  };
}
