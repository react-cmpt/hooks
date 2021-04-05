import { renderHook, act } from "@testing-library/react-hooks";

import useThrottle from "../src/useThrottle";

describe("useThrottle", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should be defined", () => {
    expect(useThrottle).toBeDefined();
  });

  it("Value", () => {
    const hook = renderHook((props) => useThrottle(props, 200), {
      initialProps: 0,
    });

    hook.rerender();

    expect(hook.result.current[0]).toEqual(0);

    hook.rerender();
    hook.rerender();
    hook.rerender();
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(hook.result.current[0]).toEqual(0);

    hook.rerender(1);
    hook.rerender(2);
    hook.rerender(3);
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(hook.result.current[0]).toEqual(3);

    hook.rerender(4);
    hook.rerender(5);
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(hook.result.current[0]).toEqual(5);
  });

  it("Functions", () => {
    const { result, rerender } = renderHook(
      (props) => useThrottle(props, 200),
      {
        initialProps: 0,
      }
    );

    rerender(1);
    rerender(2);
    act(() => {
      result.current[1].cancel();
      jest.advanceTimersByTime(200);
    });
    expect(result.current[0]).toEqual(0);

    rerender(3);
    rerender(4);
    act(() => {
      result.current[1].callPending();
    });
    expect(result.current[0]).toEqual(4);
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current[0]).toEqual(4);
  });
});
