import { renderHook, act } from "@testing-library/react-hooks";

import useDebouncedClick from "../src/useDebouncedClick";

const asyncFn = (count: number): Promise<number> => {
  return new Promise((res) => {
    setTimeout(
      (value: number) => {
        res(value);
      },
      0,
      count
    );
  });
};

// const errFn = (): Promise<number> => {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       rej(0);
//     }, 0);
//   });
// };

describe("useDebouncedClick", () => {
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
    expect(useDebouncedClick).toBeDefined();
  });

  it("Loading state", async () => {
    const hook = renderHook(() => useDebouncedClick(asyncFn, 200));

    expect(hook.result.current.loading).toEqual(false);

    void act(() => {
      hook.result.current.callback(1);
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
    const hook = renderHook(() => useDebouncedClick<void>(fn as any, 200));

    expect(fn).toHaveBeenCalledTimes(0);

    void act(() => {
      hook.result.current.callback(1);
      hook.result.current.callback(2);
      hook.result.current.callback(3);
      jest.advanceTimersByTime(200);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    await hook.waitForNextUpdate();
    expect(count).toEqual(3);

    void act(() => {
      hook.result.current.callback(4);
      hook.result.current.callback(5);
      hook.result.current.callback(6);
    });

    hook.unmount();
    expect(fn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
