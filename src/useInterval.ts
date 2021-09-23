import { useCallback, useEffect, useRef, useState } from "react";
import useMountedState from "./useMountedState";
import useUnmount from "./useUnmount";

export type ETimerState = "idle" | "running";

export type UseIntervalOptions = {
  /** Runs automatically when mounted. @default true */
  autorun?: boolean;
};

/**
 * useInterval
 *
 * @param fn
 * @param delay
 */
export default function useInterval(
  fn: () => void,
  delay?: number,
  options?: UseIntervalOptions
): { state: ETimerState; cancel: () => void; run: () => void } {
  const { autorun = true } = options || {};
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const fnRef = useRef<() => void>();

  fnRef.current = fn;

  const getMounted = useMountedState();
  const [state, setState] = useState<ETimerState>("idle");

  const run = useCallback(() => {
    getMounted() && setState("running");

    if (typeof delay === "number") {
      timer.current = setInterval(() => {
        fnRef.current?.();
      }, delay);
    } else {
      console.error("[useInterval] ERROR: 'delay' type error");

      fnRef.current?.();
      getMounted() && setState("idle");
    }
  }, [delay, getMounted]);

  const cancel = useCallback(() => {
    getMounted() && setState("idle");

    if (timer.current) {
      clearInterval(timer.current);
    }
    timer.current = undefined;
  }, [getMounted]);

  useEffect(() => {
    if (timer.current) {
      cancel();
    }

    if (autorun) {
      run();
    }
  }, [delay, cancel, run, autorun]);

  useUnmount(cancel);

  return { state, cancel, run };
}
