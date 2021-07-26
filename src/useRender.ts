import { useReducer } from "react";

export default function useRender(): () => void {
  const [, rerender] = useReducer((num: number) => num + 1, 0);

  return rerender;
}
