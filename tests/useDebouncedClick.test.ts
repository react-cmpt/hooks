import { renderHook, act } from "@testing-library/react-hooks";

import useDebouncedClick from "../src/useDebouncedClick";

const asyncFn = jest.fn().mockImplementation((value) => Promise.resolve(value));

describe("useDebouncedClick", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("should be defined", () => {
    expect(useDebouncedClick).toBeDefined();
  });

  it("Loading state", async () => {
    const hook = renderHook(() => useDebouncedClick(asyncFn, 200));

    expect(hook.result.current.loading).toEqual(false);

    void act(() => {
      void hook.result.current.callback(1);
      jest.advanceTimersByTime(200);
    });

    expect(hook.result.current.loading).toEqual(true);

    await hook.waitForNextUpdate();

    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.error).toBeUndefined();
  });

  it("Debounce", async () => {
    let count = 0;
    const fn = jest.fn((props: number) => {
      count = props;
    });
    const hook = renderHook(() => useDebouncedClick(fn as any, 200));

    expect(fn).toHaveBeenCalledTimes(0);

    void act(() => {
      void hook.result.current.callback(1);
      void hook.result.current.callback(2);
      void hook.result.current.callback(3);
      jest.advanceTimersByTime(200);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    await hook.waitForNextUpdate();
    expect(count).toEqual(3);

    void act(() => {
      void hook.result.current.callback(4);
      void hook.result.current.callback(5);
      void hook.result.current.callback(6);
    });

    hook.unmount();
    expect(fn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("wait undefined", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useDebouncedClick(asyncFn)
    );

    expect(result.current.loading).toEqual(false);

    act(() => {
      void result.current.callback(1);
      jest.advanceTimersByTime(0);
    });

    expect(result.current.loading).toEqual(true);

    await waitForNextUpdate();

    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toBeUndefined();
  });
});
