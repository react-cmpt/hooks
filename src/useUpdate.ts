import { useReducer } from "react";

export default function useUpdate(): () => void {
  const [, rerender] = useReducer((num: number) => (num + 1) % 1000000, 0);

  return rerender;
}
