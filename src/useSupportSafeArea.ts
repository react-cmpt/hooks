import { useState, useEffect, useRef } from "react";

let isSupportWebkitSafeArea = 0;

export const isIOS = () =>
  typeof navigator !== "undefined" &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent || "") ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

export type SafeAreaPositionType = "top" | "left" | "right" | "bottom";

export const supportSafeArea = (
  position: SafeAreaPositionType = "top"
): boolean => {
  if (isSupportWebkitSafeArea !== 0) {
    return isSupportWebkitSafeArea === 1;
  }
  const div = document.createElement("div");
  const id = "test-check-safe-area";
  const styles = [
    "position: fixed",
    "z-index: -1",
    `height: constant(safe-area-inset-${position})`,
    `height: env(safe-area-inset-${position})`,
  ];
  div.style.cssText = styles.join(";");
  div.id = id;
  document.body.appendChild(div);
  const areaDiv = document.getElementById(id);
  if (areaDiv) {
    isSupportWebkitSafeArea = areaDiv.offsetHeight > 0 ? 1 : -1;
    areaDiv.parentNode?.removeChild(areaDiv);
  }

  return isSupportWebkitSafeArea === 1;
};

/**
 * check if `safe-area-inset-top` env is supported
 * https://webkit.org/blog/7929/designing-websites-for-iphone-x/
 */
export default function useSupportSafeArea(options?: {
  /** default state */
  defaultState?: boolean;
  /** safe-area-inset-[postion] @default top  */
  position?: SafeAreaPositionType;
}): boolean {
  const { defaultState, position } = options || {};
  const [support, setSupport] = useState(defaultState || isIOS());

  const positionRef = useRef(position);
  positionRef.current = position;

  useEffect(() => {
    setSupport(supportSafeArea(positionRef.current));
  }, []);

  return support;
}
