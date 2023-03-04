# [0.8.0](https://github.com/react-cmpt/hooks/compare/v0.7.1...v0.8.0) (2023-03-04)


### Features

* **useEllipsis:** hidden overflow content and get overflow status ([#6](https://github.com/react-cmpt/hooks/pull/6))
* **useSupportSafeArea:** check safe-area-inset env ([e1b499e](https://github.com/react-cmpt/hooks/commit/e1b499effaa5968bf7f6f709cedadf4830bdbcc0))
* **useDebouncedClick:** keep return type (callback) ([672c148](https://github.com/react-cmpt/hooks/commit/672c1481e97ba09b6ef43adaa13a5e7d194b3c24))



## [0.7.1](https://github.com/react-cmpt/hooks/compare/v0.7.0...v0.7.1) (2021-11-12)


### Bug Fixes

* **useDebounced:** pkg read error ([ce75abf](https://github.com/react-cmpt/hooks/commit/ce75abf9715a49cb2e3467eea9ab689b3bbcf333))
* **useLoadImg:** done state to queue ([e5ee548](https://github.com/react-cmpt/hooks/commit/e5ee548fc87388cca95e4c4a965a2d6f7669a063))


### Features

* **useDeepCompareCache:** use fast-deep-equal/react ([85fb74e](https://github.com/react-cmpt/hooks/commit/85fb74ef7535bac99b0d8213e9d06a5960e6a0d6))



# [0.7.0](https://github.com/react-cmpt/hooks/compare/v0.6.2...v0.7.0) (2021-11-03)


### Features

* **useDebounce:** version -> v7 ([988c7d1](https://github.com/react-cmpt/hooks/commit/988c7d1fc44a277fba783b61d9ec6d723f8aff39))



## [0.6.2](https://github.com/react-cmpt/hooks/compare/v0.6.1...v0.6.2) (2021-09-23)


### Bug Fixes

* Build(tsconfig): jsx mode `react-jsx` -> `react` for react 16. ([6fff906](https://github.com/react-cmpt/hooks/commit/6fff9067bc9e68d95a28c220553d66d40961863e))



## [0.6.1](https://github.com/react-cmpt/hooks/compare/v0.6.0...v0.6.1) (2021-09-23)


### Features

* **useInterval:** autorun options ([a1209bf](https://github.com/react-cmpt/hooks/commit/a1209bf44570901df96fcba3cd63e1078ffe66aa))



# [0.6.0](https://github.com/react-cmpt/hooks/compare/v0.5.0...v0.6.0) (2021-09-14)


### Bug Fixes

* **useInterval:** Update unmount cycle. And remove default delay value ([851f5c9](https://github.com/react-cmpt/hooks/commit/851f5c929d346ecd5ba36d9de93a6c605536b4e1))
* **useLoadImg:** empty options ([5c8c939](https://github.com/react-cmpt/hooks/commit/5c8c9394dc9f8695b9b4b4160e98ff20905ed7bd))


### Features

* **useUpdate:** new hook. Re-render components ([b5a9c7f](https://github.com/react-cmpt/hooks/commit/b5a9c7f453979c86235ea38189d38d77017285ff))
* **useAsyncClick:** Callbacks do not return errors ([ec0015e](https://github.com/react-cmpt/hooks/commit/ec0015e32cd7f2e663dc2982cdf1383e5d1e0574), [c7b1585](https://github.com/react-cmpt/hooks/commit/c7b1585f6a606c97a850eb1b5949e24862327cf2))



# [0.5.0](https://github.com/react-cmpt/hooks/compare/v0.4.2...v0.5.0) (2021-04-13)


### Bug Fixes

* **type:** parse error ([eb7fa7f](https://github.com/react-cmpt/hooks/commit/eb7fa7f64ceb18d4b1af940d7bce91aa481a7d39))


### Features

* **useThrottle:** version -> 0.3.2 ([4ebd32c](https://github.com/react-cmpt/hooks/commit/4ebd32cc4eef38c2e22ac9a5d4b961ed2c83a2ce))



## [0.4.2](https://github.com/react-cmpt/hooks/compare/v0.4.1...v0.4.2) (2021-01-30)


### Refactor

* equal: lodash.isequal -> [fast-deep-equal](https://github.com/epoberezkin/fast-deep-equal) ([cd18b32](https://github.com/react-cmpt/hooks/commit/cd18b32017c320964b6157756abef805689c0d22))



## [0.4.1](https://github.com/react-cmpt/hooks/compare/v0.4.0...v0.4.1) (2021-01-20)


### Features

* **useLoadImg:** JSX.Element -> ImgElement (imgNode type) ([3c41ff0](https://github.com/react-cmpt/hooks/commit/3c41ff0f70a652c0433848cadafde876ed2409d7))



# [0.4.0](https://github.com/react-cmpt/hooks/compare/v0.3.1...v0.4.0) (2020-08-15)


### Features

* useInterval (Handle the setInterval timer function) ([310423b](https://github.com/react-cmpt/hooks/commit/310423b2a6050cab64b6f699045c38ff8414ee8d))



## [0.3.1](https://github.com/react-cmpt/hooks/compare/v0.3.0...v0.3.1) (2020-07-21)


### Features

* deps: upgrade debounce and throttle ([324b181](https://github.com/react-cmpt/hooks/commit/324b1814074f616143ea75d9c0b4e5b0d79c10be))



# [0.3.0](https://github.com/react-cmpt/hooks/compare/v0.2.2...v0.3.0) (2020-06-25)


### Bug Fixes

* **useAsyncClick:** abort when component unmounted ([b4c15ad](https://github.com/react-cmpt/hooks/commit/b4c15add11cc2f54434bb1470fdeecd0dd3e3b43))


### Features

* useMountedState ([9415f65](https://github.com/react-cmpt/hooks/commit/9415f6597cb7bc3f24b9d723d3a9d4e4ba821b8b))



## [0.2.2](https://github.com/react-cmpt/hooks/compare/v0.2.1...v0.2.2) (2020-06-17)


### Refactor

* **useLoadImg** useCallback deps use useDeepCompareCache ([825c751](https://github.com/react-cmpt/hooks/commit/825c751815c22a657537840cf0b35cc7f49941b1))
* **useLoadImg** export EImgState type ([825c751](https://github.com/react-cmpt/hooks/commit/825c751815c22a657537840cf0b35cc7f49941b1))



## [0.2.1](https://github.com/react-cmpt/hooks/compare/v0.2.0...v0.2.1) (2020-06-02)


### Bug Fixes

* **useThrottleFn:** callPending repeatedly ([7acaaef](https://github.com/react-cmpt/hooks/commit/7acaaef1ed6b0d6e219708fe440e20092d1f9e15))



# [0.2.0](https://github.com/react-cmpt/hooks/compare/0.2.0-alpha...0.2.0) (2020-04-27)


### Features

* remove the default wait value ([90438b6](https://github.com/react-cmpt/hooks/commit/90438b64c7ec1388bb4c556de4d1b7a98372779c))
* useThrottle / useThrottleFn (deps) ([2500062](https://github.com/react-cmpt/hooks/commit/2500062b84a5c751ff3d2e552827f46d1322db7a))



# [0.2.0-alpha](https://github.com/react-cmpt/hooks/compare/0.1.0...0.2.0-alpha) (2020-04-14)


### Features

* **useAsyncClick:** with multiple parameters ([63f0f60](https://github.com/react-cmpt/hooks/commit/63f0f60e6325b9f0adee4f79af2ea339490bb8a8))
* useThrottle/useThrottleFn ([2be9411](https://github.com/react-cmpt/hooks/commit/2be94113370dde5185779d29b479963cf5f96adf))
* useUnmount ([013e46d](https://github.com/react-cmpt/hooks/commit/013e46ddeeb6290499cf8ec230e3b4c5024d2c1f))
* useUpdateEffect ([16775cc](https://github.com/react-cmpt/hooks/commit/16775cc4aa40a9fa2d4c161ae3dad9ca662f0d4d))



# [0.1.0](https://github.com/react-cmpt/hooks/compare/0.1.0-alpha...0.1.0) (2020-03-19)


### Features

* useLoadImg ([b576561](https://github.com/react-cmpt/hooks/commit/b5765613d169034ba67e1cd0ce3c7aa32828e9ce))



# [0.1.0-alpha](https://github.com/react-cmpt/hooks/compare/9df37222e0f0fd3717eab40910232102fc19df38...0.1.0-alpha) (2020-03-18)


### Features

* **async-click:** options not required ([5ffcb6d](https://github.com/react-cmpt/hooks/commit/5ffcb6dbbc011435eb32423a39e7f32461741c23))
* transfer useDebounce, useDebouncedCallback ([20096c5](https://github.com/react-cmpt/hooks/commit/20096c5fca9b02039554d88d634c842719422c13))
* useAsyncClick ([c59d0ae](https://github.com/react-cmpt/hooks/commit/c59d0aefc61cb4f637116e4da0133bed18aa8d9a))
* useDebouncedClick ([f07619a](https://github.com/react-cmpt/hooks/commit/f07619a6b1b8525de14e02bcfe9d24a05e81030b))
* useDeepCompareCache ([9df3722](https://github.com/react-cmpt/hooks/commit/9df37222e0f0fd3717eab40910232102fc19df38))
* useDeepEffect ([badf38e](https://github.com/react-cmpt/hooks/commit/badf38e57829f6701d87dfe9d56f5adf10b5f34c))



