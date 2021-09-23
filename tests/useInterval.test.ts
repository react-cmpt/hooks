import { renderHook, act } from "@testing-library/react-hooks";
import { useCallback, useState } from "react";

import useInterval from "../src/useInterval";

const original = console.error;

describe("useInterval", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();

    console.error = original;
  });

  it("should be defined", () => {
    expect(useInterval).toBeDefined();
  });

  it("Delay", () => {
    const fn = jest.fn();
    const { rerender, unmount } = renderHook(
      (props: number) => useInterval(fn, props),
      {
        initialProps: 200,
      }
    );

    rerender();
    expect(fn).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);

    rerender(300);
    expect(fn).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(3);

    rerender(400);
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(3);
    rerender(500);
    jest.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(3);
    jest.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(4);

    unmount();
  });

  it("state delay", () => {
    const fn = jest.fn();
    const { result, unmount } = renderHook(() => {
      const [delay, setDelay] = useState<number>();
      const interval = useInterval(fn, delay);

      const callback = useCallback((num: number) => {
        setDelay(num);
      }, []);

      return { interval, callback };
    });

    expect(console.error).toHaveBeenCalled();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(result.current.interval.state).toEqual("idle");

    act(() => {
      result.current.callback(200);
    });
    expect(fn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(2);

    act(() => {
      result.current.callback(300);
    });
    jest.advanceTimersByTime(200);
    act(() => {
      result.current.callback(400);
      result.current.callback(500);
      result.current.callback(600);
      result.current.callback(400);
    });
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(3);

    unmount();
  });

  it("Empty fn", () => {
    const { rerender, result, unmount } = renderHook((props: number) =>
      useInterval(null as any, props)
    );

    expect(result.current.state).toEqual("idle");

    rerender(200);
    expect(result.current.state).toEqual("running");
    jest.advanceTimersByTime(200);
    expect(result.current.state).toEqual("running");

    act(() => {
      result.current.cancel();
    });
    expect(result.current.state).toEqual("idle");

    unmount();
  });

  it("Returns", () => {
    let count = 0;
    const fn = jest.fn(() => count++);
    const { result, rerender } = renderHook(() => useInterval(fn, 200));

    rerender();
    expect(fn).toHaveBeenCalledTimes(0);

    rerender();
    rerender();
    rerender();
    expect(fn).toHaveBeenCalledTimes(0);
    expect(result.current.state).toEqual("running");

    jest.advanceTimersByTime(100);
    expect(count).toEqual(0);
    expect(fn).toHaveBeenCalledTimes(0);
    expect(result.current.state).toEqual("running");

    jest.advanceTimersByTime(100);
    expect(count).toEqual(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(result.current.state).toEqual("running");

    jest.advanceTimersByTime(200);
    expect(count).toEqual(2);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(result.current.state).toEqual("running");

    void act(() => {
      result.current.cancel();
    });
    expect(result.current.state).toEqual("idle");
    jest.runAllTimers();
    expect(count).toBe(2);

    void act(() => {
      result.current.run();
    });
    expect(result.current.state).toEqual("running");
    jest.advanceTimersByTime(200);
    expect(count).toEqual(3);
    expect(fn).toHaveBeenCalledTimes(3);

    void act(() => {
      result.current.cancel();
    });
    expect(result.current.state).toEqual("idle");
    jest.runAllTimers();
    expect(count).toBe(3);
  });

  it("options: autoRun", () => {
    const fn = jest.fn();
    const { rerender, result, unmount } = renderHook(() =>
      useInterval(fn, 100, { autorun: false })
    );

    rerender();
    expect(fn).toHaveBeenCalledTimes(0);
    expect(result.current.state).toEqual("idle");

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(0);
    expect(result.current.state).toEqual("idle");

    rerender();
    rerender();
    rerender();
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(0);
    expect(result.current.state).toEqual("idle");

    act(() => {
      result.current.run();
    });

    expect(fn).toHaveBeenCalledTimes(0);
    expect(result.current.state).toEqual("running");
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(result.current.state).toEqual("running");
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(result.current.state).toEqual("running");

    act(() => {
      result.current.cancel();
    });
    expect(result.current.state).toEqual("idle");

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(result.current.state).toEqual("idle");

    unmount();

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(result.current.state).toEqual("idle");
  });

  it("Unmount", () => {
    const fn = jest.fn();
    const { result, rerender, unmount } = renderHook(() =>
      useInterval(fn, 200)
    );

    rerender();
    expect(fn).toHaveBeenCalledTimes(0);
    expect(result.current.state).toEqual("running");

    jest.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(result.current.state).toEqual("running");

    unmount();

    jest.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);

    void act(() => {
      result.current.cancel();
      result.current.run();
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(result.current.state).toEqual("running");
    jest.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(result.current.state).toEqual("running");
    jest.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(3);
    expect(result.current.state).toEqual("running");

    act(() => {
      result.current.cancel();
    });
    jest.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(3);
    expect(result.current.state).toEqual("running");
    jest.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(3);
    expect(result.current.state).toEqual("running");
  });
});
