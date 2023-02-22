import { renderHook } from "@testing-library/react-hooks";
import { render, screen } from "@testing-library/react";

import useEllipsis from "../src/useEllipsis";

const SHORT_TEXT = "peace and love.";
// const LONG_TEXT =
//   "peace and love. peace and love. peace and love. peace and love. peace and love.";

describe("useEllipsis", () => {
  it("should be defined", () => {
    expect(useEllipsis).toBeDefined();
  });

  it("render (short)", () => {
    const { result } = renderHook(() => useEllipsis(SHORT_TEXT));

    render(result.current.node);

    const el = screen.getByText(SHORT_TEXT);
    expect(el.textContent).toBe(SHORT_TEXT);
    expect(el.style.textOverflow).toBe("ellipsis");
    expect(result.current.overflow).toBeFalsy();
  });
});
