import { renderHook, act } from "@testing-library/react-hooks";
import { render, screen, fireEvent } from "@testing-library/react";

import useLoadImg from "../src/useLoadImg";

describe("useLoadImg", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("Init null", () => {
    const { result } = renderHook(() => useLoadImg({}));

    expect(result.current.imgNode).not.toBeNull();
    expect(result.current.state).toEqual("idle");
    expect(result.current.loading).toEqual(false);
    expect(result.current.isError).toEqual(true);
  });

  it("Init", async () => {
    const onError = jest.fn();
    const onLoad = jest.fn();
    const { result } = renderHook(() =>
      useLoadImg({ src: "./demo.jpg", imgProps: { onError, onLoad } })
    );

    expect(result.current.imgNode).not.toBeNull();
    expect(result.current.state).toEqual("loading");
    expect(result.current.loading).toEqual(true);
    expect(result.current.isError).toEqual(false);

    const node = result.current.imgNode;

    render(node);

    const img = await screen.findByRole("img");

    act(() => {
      fireEvent.error(img);
    });

    expect(onError).toHaveBeenCalled();
    expect(result.current.imgNode).not.toBeNull();
    expect(result.current.state).toEqual("error");
    expect(result.current.loading).toEqual(false);
    expect(result.current.isError).toEqual(true);
    act(() => {
      fireEvent.load(img);
      jest.advanceTimersByTime(0);
    });

    expect(onLoad).toHaveBeenCalled();
    expect(result.current.imgNode).not.toBeNull();
    expect(result.current.state).toEqual("done");
    expect(result.current.loading).toEqual(false);
    expect(result.current.isError).toEqual(false);
  });

  it("Image props", async () => {
    const optionsObj = {
      src: "./demo.jpg",
      style: { width: "100%" },
      className: "classname-demo",
      imgProps: { key: "img-key" },
    };
    const { result } = renderHook(() => useLoadImg(optionsObj));

    const node = result.current.imgNode;

    expect(node.type).toEqual("img");
    expect(node.props.src).toEqual(optionsObj.src);
    expect(node.props.style).toEqual(optionsObj.style);
    expect(node.props.className).toEqual(optionsObj.className);
    expect(result.current.imgNode.key).toEqual(optionsObj.imgProps.key);

    render(node);

    const img = await screen.findByRole("img");

    expect(result.current.state).toEqual("loading");
    act(() => {
      fireEvent.error(img);
    });
    expect(result.current.state).toEqual("error");
    act(() => {
      fireEvent.load(img);
      jest.advanceTimersByTime(0);
    });
    expect(result.current.state).toEqual("done");
  });

  it("Empty props", async () => {
    const { result } = renderHook(() => useLoadImg(null as any));

    expect(result.current.state).toEqual("idle");

    render(result.current.imgNode);
    const img = await screen.findByRole("img");

    expect(result.current.state).toEqual("idle");
    act(() => {
      fireEvent.error(img);
    });
    expect(result.current.state).toEqual("error");

    act(() => {
      fireEvent.load(img);
      jest.advanceTimersByTime(0);
    });
    expect(result.current.state).toEqual("done");
  });

  it("props lazy", async () => {
    const optionsObj = {
      src: "./demo.jpg",
      lazy: 100,
    };
    const { result } = renderHook(() => useLoadImg(optionsObj));

    const node = result.current.imgNode;

    expect(node.type).toEqual("img");
    expect(node.props.src).toEqual(optionsObj.src);
    render(node);

    const img = await screen.findByRole("img");

    expect(result.current.state).toEqual("loading");
    act(() => {
      fireEvent.load(img);
      jest.advanceTimersByTime(0);
    });
    expect(result.current.state).toEqual("loading");

    act(() => {
      jest.advanceTimersByTime(optionsObj.lazy);
    });
    expect(result.current.state).toEqual("done");
  });
});
