import useAsyncClick from "./useAsyncClick";
import type { DebouncedState } from "./useDebouncedCallback";
import useDebouncedCallback from "./useDebouncedCallback";

export type ReturnResult<T extends (...args: any[]) => ReturnType<T>> = {
  callback: DebouncedState<(...args: any[]) => Promise<void>>;
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
export default function useDebouncedClick<
  T extends (...args: any[]) => ReturnType<T>
>(
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
    callback: onClickEvent,
    loading,
    error,
  };
}
