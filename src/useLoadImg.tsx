import type { CSSProperties } from "react";
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import useDeepCompareCache from "./useDeepCompareCache";
import useUnmount from "./useUnmount";

export type EImgState = "loading" | "done" | "error" | "idle";

export type ImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export type ImgElement = React.ReactElement<ImageProps>;

export default function useLoadImg(options: {
  src?: string;
  reqLoading?: boolean;
  className?: string;
  style?: CSSProperties;
  imgProps?: ImageProps;
  lazy?: number;
}): {
  imgNode: ImgElement;
  state: EImgState;
  loading: boolean;
  isError: boolean;
} {
  const {
    src,
    reqLoading,
    className,
    style,
    imgProps,
    lazy = 0,
  } = options || {};
  const [state, setState] = useState<EImgState>("idle");
  const stateTimer = useRef<ReturnType<typeof setTimeout>>();

  const loading = (state === "loading" && src != null) || !!reqLoading;
  const isError = state === "error" || (src == null && !reqLoading);

  const handleImageLoaded = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      stateTimer.current = setTimeout(() => {
        setState("done");
      }, lazy);
      imgProps?.onLoad?.(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useDeepCompareCache([imgProps, lazy])
  );

  const handleImageErrored = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setState("error");
      imgProps?.onError?.(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useDeepCompareCache([imgProps])
  );

  useEffect(() => {
    if (src) {
      setState("loading");
    } else {
      setState("idle");
    }
  }, [src]);

  useUnmount(() => {
    if (stateTimer.current) {
      clearTimeout(stateTimer.current);
    }
  });

  const imgNode = useMemo(
    () => (
      <img
        className={className}
        style={style}
        {...imgProps}
        src={src}
        onLoad={handleImageLoaded}
        onError={handleImageErrored}
      />
    ),
    [className, style, src, handleImageLoaded, handleImageErrored, imgProps]
  );

  return { imgNode, state, loading, isError };
}
