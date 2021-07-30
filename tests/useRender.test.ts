import { act, renderHook } from "@testing-library/react-hooks";
import { useEffect } from "react";

import useRender from "../src/useRender";

describe("useUnmount", () => {
  it("should be defined", () => {
    expect(useRender).toBeDefined();
  });

  it("return type (function)", () => {
    const { result } = renderHook(() => useRender());

    expect(result.current).toBeInstanceOf(Function);
  });

  it("rerender", () => {
    let renderTimes = 0;
    let fnUpdateTimes = 0;

    const { result, rerender } = renderHook(() => {
      renderTimes += 1;
      const rerender = useRender();

      useEffect(() => {
        fnUpdateTimes += 1;
      }, [rerender]);

      return rerender;
    });

    expect(renderTimes).toBe(1);
    expect(fnUpdateTimes).toBe(1);

    rerender();
    expect(renderTimes).toBe(2);
    expect(fnUpdateTimes).toBe(1);

    act(() => {
      result.current();
    });
    expect(renderTimes).toBe(3);
    expect(fnUpdateTimes).toBe(1);

    act(() => {
      result.current();
    });
    expect(renderTimes).toBe(4);
    expect(fnUpdateTimes).toBe(1);
  });
});
