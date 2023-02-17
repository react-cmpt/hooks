import type { ReactNode, DetailedHTMLProps, CSSProperties } from "react";
import React, {
  useRef,
  useMemo,
  useEffect,
  useCallback,
  useState,
} from "react";

import useDebouncedCallback from "./useDebouncedCallback";

type HTMLDIVProps = DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const defautEllipsisStyle: CSSProperties = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export type WebkitLineClampType =
  | "-moz-initial"
  | "inherit"
  | "initial"
  | "revert"
  | "unset"
  | "none"
  | number;

const getEllipsisStyle = (lineClamp?: WebkitLineClampType): CSSProperties => {
  if (lineClamp && typeof lineClamp === "number" && lineClamp > 1) {
    return {
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: lineClamp,
      overflow: "hidden",
    };
  }
  return defautEllipsisStyle;
};

export type UseEllipsisOptions = {
  lineClamp?: WebkitLineClampType;
  debouncedWait?: number;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
  wrapperProps?: Partial<HTMLDIVProps>;
};

export default function useEllipsis(
  content?: ReactNode,
  options?: UseEllipsisOptions
) {
  const {
    lineClamp,
    debouncedWait = 500,
    wrapperClassName,
    wrapperStyle,
    wrapperProps,
  } = options || {};
  const wrapperRef = useRef<HTMLDivElement>(null);
  const roRef = useRef<ResizeObserver>();
  const [overflow, setOverflow] = useState(false);

  const computeEllipsis = useCallback(() => {
    const _el = wrapperRef.current;
    if (_el) {
      const _bool =
        _el.scrollWidth > _el.offsetWidth ||
        _el.scrollHeight > _el.offsetHeight;

      setOverflow(_bool);
    }
  }, []);

  const deComputeEllipsis = useDebouncedCallback(
    computeEllipsis,
    debouncedWait
  );

  const observerEl = useCallback(() => {
    if (roRef.current) {
      roRef.current.disconnect();

      if (wrapperRef.current) {
        roRef.current.observe(wrapperRef.current);
      }
    } else if (wrapperRef.current) {
      roRef.current = new ResizeObserver(() => {
        deComputeEllipsis();
      });

      roRef.current.observe(wrapperRef.current);
    }
  }, [deComputeEllipsis]);

  useEffect(() => {
    observerEl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const node = useMemo(
    () => (
      <div
        ref={wrapperRef}
        className={wrapperClassName}
        style={{
          ...getEllipsisStyle(lineClamp),
          ...wrapperStyle,
        }}
        {...wrapperProps}
      >
        {content}
      </div>
    ),
    [content, lineClamp, wrapperClassName, wrapperProps, wrapperStyle]
  );

  return { node, overflow };
}
