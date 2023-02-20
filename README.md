# React Hooks

Collection of some react hooks

[![CI](https://github.com/react-cmpt/hooks/workflows/CI/badge.svg?branch=main)](https://github.com/react-cmpt/hooks/actions?query=workflow%3ACI)
[![npm](https://img.shields.io/npm/v/@react-cmpt/hooks.svg)](https://www.npmjs.com/package/@react-cmpt/hooks)

## Usage

### Installation

```shell
yarn add @react-cmpt/hooks
```

## Hooks

- [useAsyncClick](#useAsyncClick)
- [useDebounce](#useDebounce)
- [useDebouncedCallback](#useDebouncedCallback)
- [useDebouncedClick](#useDebouncedClick)
- [useDeepCompareCache](#useDeepCompareCache)
- [useDeepEffect](#useDeepEffect)
- [useInterval](#useInterval)
- [useLoadImg](#useLoadImg)
- [useMountedState](#useMountedState)
- [useSupportSafeArea](#useSupportSafeArea)
- [useThrottle](#useThrottle)
- [useThrottleFn](#useThrottleFn)
- [useUnmount](#useUnmount)
- [useUpdate](#useUpdate)
- [useUpdateEffect](#useUpdateEffect)

### useAsyncClick

Click event with `loading`

| option    | type     | default              | explain           |
| --------- | -------- | -------------------- | ----------------- |
| asyncFunc | function |                      | async function    |
| initState | Object   | `{ loading: false }` | initial `loading` |

| return   | type     | default | explain     |
| -------- | -------- | ------- | ----------- |
| callback | function |         |             |
| loading  | boolean  |         |             |
| error    | Error    |         | catch error |

```tsx
import { useAsyncClick } from "@react-cmpt/hooks";

const asyncFn = async () => {
  // do something
};

const Demo = ({ asyncFn }) => {
  const { callback, loading } = useAsyncClick(asyncFn);

  return <Button loading={loading} click={callback} />;
};
```

### useDebounce

| option  | type   | default | explain |
| ------- | ------ | ------- | ------- |
| value   | any    |         |         |
| delay   | number |         |         |
| options | Object |         |         |

options:

| option     | type     | default | explain                                                                                                                          |
| ---------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| maxWait    | number   |         | Describes the maximum time func is allowed to be delayed before it's invoked                                                     |
| leading    | boolean  |         | This param will execute the function once immediately when called. Subsequent calls will be debounced until the timeout expires. |
| equalityFn | function |         | Comparator function which shows if timeout should be started                                                                     |

> [more options](https://github.com/xnimorz/use-debounce#options)

```tsx
import { useDebounce } from "@react-cmpt/hooks";

const Demo = () => {
  const [text, setText] = useState("hello");
  const [value] = useDebounce(text, 1000);

  return (
    <div>
      <input
        defaultValue={"hello"}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <p>Actual value: {text}</p>
      <p>Debounce value: {value}</p>
    </div>
  );
};
```

### useDebouncedCallback

| option   | type     | default | explain |
| -------- | -------- | ------- | ------- |
| callback | function |         |         |
| delay    | number   |         |         |
| options  | Object   |         |         |

```tsx
import { useDebouncedCallback } from "@react-cmpt/hooks";

const Demo = () => {
  const [value, setValue] = useState();
  // Debounce callback
  const debouncedCallback = useDebouncedCallback(
    // function
    (value) => {
      setValue(value);
    },
    // delay in ms
    1000
  );

  return (
    <div>
      <input onChange={(e) => debouncedCallback(e.target.value)} />
      <p>Debounced value: {value}</p>
    </div>
  );
};
```

### useDebouncedClick

Click event with `loading` and `debounce`

| option    | type     | default | explain                             |
| --------- | -------- | ------- | ----------------------------------- |
| asyncFunc | function |         | async function                      |
| delay     | number   | 0       | useDebouncedCallbackArgs["delay"]   |
| options   | Object   |         | useDebouncedCallbackArgs["options"] |

| return                  | type     | default | explain                                                |
| ----------------------- | -------- | ------- | ------------------------------------------------------ |
| callback                | function |         |                                                        |
| loading                 | boolean  |         |                                                        |
| cancelDebouncedCallback | function |         | useDebouncedCallbackReturns["cancelDebouncedCallback"] |
| callPending             | function |         | useDebouncedCallbackReturns["callPending"]             |
| error                   | Error    |         | catch error                                            |

```tsx
import { useDebouncedClick } from "@react-cmpt/hooks";

const asyncFn = async () => {
  // do something
};

const Demo = ({ asyncFn }) => {
  const { callback, loading } = useDebounceClick(asyncFn);

  return <Button loading={loading} click={callback} />;
};
```

### useDeepCompareCache

| option | type | default | explain |
| ------ | ---- | ------- | ------- |
| value  | any  |         |         |

```tsx
import { useDeepCompareCache } from "@react-cmpt/hooks";

const obj1 = { a: 1, b: { b1: 2 } };
const obj2 = { a: 1, b: { b1: 2 } };

const Demo = () => {
  const obj = useDeepCompareCache(obj1);
  console.log(obj1 === obj2); // false
  console.log(obj === obj1); // true
  console.log(obj === obj2); // true

  // ...
};
```

```tsx
import { useDeepCompareCache } from "@react-cmpt/hooks";

const Demo = () => {
  // Deep comparison React.useEffect
  useEffect(() => {
    // ...
  }, useDeepCompareCache([A, B]));

  // Deep comparison React.useCallback
  const callback = useCallback(() => {
    // ...
  }, useDeepCompareCache([A, B]));

  // ...
};
```

### useDeepEffect

Deep comparison React.useEffect

| option | type     | default | explain                                                                 |
| ------ | -------- | ------- | ----------------------------------------------------------------------- |
| effect | function |         | Imperative function that can return a cleanup function                  |
| deps   | Array    |         | If present, effect will only activate if the values in the list change. |

```tsx
import { useDeepEffect } from "@react-cmpt/hooks";

const Demo = ({ value: Object }) => {
  useDeepEffect(() => {
    // do something
  }, [value]);

  // ...
};
```

### useInterval

Handle the setInterval timer function.

| option          | type     | default | explain                                 |
| --------------- | -------- | ------- | --------------------------------------- |
| fn              | function | -       | Handle function. (setInterval callback) |
| delay           | number   | -       | setInterval ms.                         |
| options.autorun | boolean  | true    | Runs automatically when mounted         |

| return | type              | default | explain                           |
| ------ | ----------------- | ------- | --------------------------------- |
| state  | `idle`, `running` | `idle`  | Operating status.                 |
| cancel | function          |         | The clear timer function.         |
| run    | function          |         | Manual restart interval function. |

```tsx
import { useInterval } from "@react-cmpt/hooks";

const Demo = () => {
  const { state, cancel, run } = useInterval(() => {
    console.log("hi");
  }, 1000);

  // ...
};
```

### useMountedState

Check component mount state

| option | type | default | explain |
| ------ | ---- | ------- | ------- |
| -      | -    | -       | -       |

| return   | type     | default | explain          |
| -------- | -------- | ------- | ---------------- |
| callback | function |         | Get mount status |

```tsx
import { useMountedState } from "@react-cmpt/hooks";

const Demo = () => {
  const getMounted = useMountedState();

  useEffect(() => {
    setTimeout(() => {
      if (getMounted()) {
        // do...
      }
    }, 1000);
  }, []);

  // ...
};
```

### useSupportSafeArea

- check if `safe-area-inset-[top]` env is supported
- https://webkit.org/blog/7929/designing-websites-for-iphone-x/

| options      | type                                   | default | explain                   |
| ------------ | -------------------------------------- | ------- | ------------------------- |
| defaultState | boolean                                | -       | default return bool       |
| position     | 'top' \| 'left' \| 'right' \| 'bottom' | `top`   | safe-area-inset-[postion] |

```tsx
import { useLoadImg } from "@react-cmpt/hooks";

const Demo = () => {
  const supportSafeArea = useSupportSafeArea({ postion: "bottom" });

  return (
    <div
      style={{
        paddingBottom: supportSafeArea ? `env(safe-area-inset-bottom)` : "16px",
      }}
    >
      footer
    </div>
  );
};
```

#### constant or env

```css
:root {
  @supports (top: constant(safe-area-inset-top)) {
    --safe-area-inset-top: constant(safe-area-inset-top);
    --safe-area-inset-right: constant(safe-area-inset-right);
    --safe-area-inset-bottom: constant(safe-area-inset-bottom);
    --safe-area-inset-left: constant(safe-area-inset-left);
  }

  @supports (top: env(safe-area-inset-top)) {
    --safe-area-inset-top: env(safe-area-inset-top);
    --safe-area-inset-right: env(safe-area-inset-right);
    --safe-area-inset-bottom: env(safe-area-inset-bottom);
    --safe-area-inset-left: env(safe-area-inset-left);
  }
}

.demo {
  padding-bottom: 16px;

  &[data-supportSafeArea="true"] {
    padding-bottom: var(--safe-area-inset-bottom);
  }
}
```

### useLoadImg

Get image loading status

| option     | type    | default | explain             |
| ---------- | ------- | ------- | ------------------- |
| src        | string  |         | `<img />` src       |
| reqLoading | boolean |         | request loading     |
| className  | string  |         |                     |
| style      | Object  |         |                     |
| imgProps   | Object  |         | `<img />` props     |
| lazy       | number  | 0       | Delay of done state |

| return  | type                               | default | explain       |
| ------- | ---------------------------------- | ------- | ------------- |
| imgNode | JSX.Element                        |         | `<img />`     |
| state   | `loading`, `done`, `error`, `idle` | `idle`  | image state   |
| loading | boolean                            |         |               |
| isError | boolean                            |         | image errored |

```tsx
import { useLoadImg } from "@react-cmpt/hooks";

const Demo = () => {
  const { imgNode, loading } = useLoadImg({
    src: "[PATH]/demo.jpg",
    style: { width: "100%" },
  });

  return <div data-loading={loading}>{imgNode}</div>;
};
```

### useThrottle

throttled value

<table>
  <tr>
    <th colspan="2">option</th>
    <th>type</th>
    <th>default</th>
    <th>explain</th>
  </tr>
  <tr>
    <td colspan="2">value</td>
    <td>any</td>
    <td>-</td>
    <td>The value to throttle.</td>
  </tr>
  <tr>
    <td colspan="2">wait</td>
    <td>number</td>
    <td>0</td>
    <td>The number of milliseconds to throttle invocations to.</td>
  </tr>
  <tr>
    <td rowspan="2">options</td>
    <td>leading</td>
    <td>boolean</td>
    <td>-</td>
    <td>Specify invoking on the leading edge of the timeout.</td>
  </tr>
  <tr>
    <td>customizer</td>
    <td>function</td>
    <td>-</td>
    <td>The function to customize comparisons.</td>
  </tr>
</table>

| return      | type     | explain                          |
| ----------- | -------- | -------------------------------- |
| value       | any      | Returns the new throttled value. |
| cancel      | function | The clear timer function.        |
| callPending | function | The callback manually function.  |

```tsx
import { useThrottle } from "@react-cmpt/use-throttle";

const Demo = ({ value }) => {
  const [tValue, { cancel, callPending }] = useThrottle(value, 200);

  // ...
};
```

### useThrottleFn

throttled function

<<table>

  <tr>
    <th colspan="2">option</th>
    <th>type</th>
    <th>default</th>
    <th>explain</th>
  </tr>
  <tr>
    <td colspan="2">fn</td>
    <td>function</td>
    <td>-</td>
    <td>The function to throttle.</td>
  </tr>
  <tr>
    <td colspan="2">wait</td>
    <td>number</td>
    <td>0</td>
    <td>The number of milliseconds to throttle invocations to.</td>
  </tr>
  <tr>
    <td rowspan="1">options</td>
    <td>leading</td>
    <td>boolean</td>
    <td>-</td>
    <td>Specify invoking on the leading edge of the timeout.</td>
  </tr>
</table>

| return      | type     | explain                         |
| ----------- | -------- | ------------------------------- |
| callback    | function | The new throttled function.     |
| cancel      | function | The clear timer function.       |
| callPending | function | The callback manually function. |

```tsx
import { useThrottleFn } from "@react-cmpt/use-throttle";

const Demo = () => {
  const { callback, cancel, callPending } = useThrottleFn(() => {
    console.log("click");
  }, 200);

  return <button onClick={callback}>++</button>;
};
```

### useUnmount

Unmount callback

| option | type     | default | explain |
| ------ | -------- | ------- | ------- |
| fn     | function |         |         |

```tsx
import { useUnmount } from "@react-cmpt/hooks";

const Demo = () => {
  useUnmount(() => {
    console.log("Unmount");
  });

  // ...
};
```

### useUpdate

Re-render components

| return   | type     | default | explain           |
| -------- | -------- | ------- | ----------------- |
| rerender | function |         | rerender callback |

```tsx
import { useUpdate } from "@react-cmpt/hooks";

const Demo = () => {
  const rerender = useUpdate();

  return (
    <>
      <div>Date: {Date.now()}</div>
      <button onClick={rerender}>Update</button>
    </>
  );
};
```

### useUpdateEffect

React.useEffect cancel the first mount trigger

| option | type     | default | explain                                                                 |
| ------ | -------- | ------- | ----------------------------------------------------------------------- |
| effect | function |         | Imperative function that can return a cleanup function                  |
| deps   | Array    |         | If present, effect will only activate if the values in the list change. |

```tsx
import { useUpdateEffect, useDeepCompareCache } from "@react-cmpt/hooks";

const Demo = () => {
  useUpdateEffect(() => {
    console.log(value);
  }, [value]);

  // Deep comparison useUpdateEffect
  useUpdateEffect(() => {
    console.log(value);
  }, useDeepCompareCache([value]));

  // ...
};
```

## Dependencies

- [fast-deep-equal](https://github.com/epoberezkin/fast-deep-equal)
- [use-debounce](https://github.com/xnimorz/use-debounce)
- [@react-cmpt/use-throttle](https://github.com/react-cmpt/use-throttle)

## Dev

```shell
# build package
yarn build

# tests
yarn test

# lint
yarn lint
```

## License

[MIT](./LICENSE)
