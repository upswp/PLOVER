# Redux

##### Redux란? ([공식 문서](https://ko.redux.js.org/))

* Javascript app을 위한 예측 가능한 state container

* React뿐만 아니라 Augular, jQuery, JS등 다양한 프레임워크와 작동
* 전역 상태를 다뤄야 할 때 유용



##### 어떨 때 Redux를 사용하나?

* 계속해서 바뀌는 상당한 양의 데이터가 있을 때
* 상태를 위한 **하나**의 근원이 필요할 때
* 최상위 컴포넌트가 모든 상태를 가지고 있는 것이 적절하지 않다고 생각할 때



##### React와 Redux로 새 앱 만들기

```bash
npx create-react-app my-app --template redux

#npm에서 코어 라이브러리 받기
npm install redux
```



##### 원문 (출처: Redux 공식 문서)

> - Redux is a library for managing global application state
>   - Redux is typically used with the React-Redux library for integrating Redux and React together
>   - Redux Toolkit is the recommended way to write Redux logic
> - Redux uses a "one-way data flow" app structure
>   - State describes the condition of the app at a point in time, and UI renders based on that state
>   - When something happens in the app:
>     - The UI dispatches an action
>     - The store runs the reducers, and the state is updated based on what occurred
>     - The store notifies the UI that the state has changed
>   - The UI re-renders based on the new state
> - Redux uses several types of code
>   - *Actions* are plain objects with a `type` field, and describe "what happened" in the app
>   - *Reducers* are functions that calculate a new state value based on previous state + an action
>   - A Redux *store* runs the root reducer whenever an action is *dispatched*