# React Proptypes

##### 공유문서 읽기 전 주의

- 전달에 오해가 없도록 최대한 공식문서 기준으로 정리
- 내용, 코드 는 공식 문서를 기준으로 하되 표현 방식은 본인이 이해한 대로 서술👀😁
- 활용 가능할 것 같은 것들을 별표로 따로 표시 `⭐⭐⭐⭐⭐ - 활용가능한 페이지`

- 다른 문서들도 아래에 첨부해 둡니다 🙌🤷‍♂️👩‍🏫



##### 참고 사이트

1. React 공식문서

   : https://ko.reactjs.org/docs/typechecking-with-proptypes.html

2. 참고1

   : https://www.daleseo.com/react-prop-types/

3. 참고2

   : https://velog.io/@lllen/reactPropTypes-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0



-------------------

※ 사용 전 주의

- React v15.5부터는 `prop-types` 라이브러리를 사용



------------------

### 1. 사용법

##### 설치

```bash
npm i prop-types
```

##### import

```bash
import PropTypes from "prop-types";
```



### 2. React proptypes 사용 이유

- 프로젝트의 규모가 커짐에 따라 자바스크립트의 유동적인 코딩 방식으로 야기되는 대표적인 문제가 타입을 지정하지 않는 것이다.
- 최근 타입 확인을 위해 flow 또는 typescript 와 같은 방식을 활용하는 방법도 있지만, React는 내장된 타입 확인 기능들을 가지고 있다.
- 컴포넌트의 props의 타입을 확인하려면 다음과 같이 propTypes를 선언할 수 있다.

```react
import PropTypes from 'prop-types';

class Greeting extends React.Component {
    render() {
        return (
        	<h1>Hello, {this.props.name}</h1>
        );
    }
}

Greeting.propTypes = {
    name: PropTypes.string
};
```

- propTypes는 전달받은 데이터 유효성 검증을 위해 Validator를 내보낸다. 
- `.isRequired`를 types뒤에 붙여주면 필수 prop으로 인식하고, 값이 없거나 잘못되었을 경우 콘솔 창에서 오류를 확인할 수 있다.

```React
Greeting.propTypes = {
  name: PropTypes.string.isRequired
};
```

- prop에 유효하지 않은 값이 전달 되었을 때, 경고문이 JS 콘솔을 통해 출력된다.

  ※참고 : propTypes 는 성능상의 이유로 개발 모드에서만 확인 가능.

- 요약 : 전달받은 props 가 내가 원하는 props 인지 확인해줌.



### 2. 다양한 사용 예시

#### 1) 하나의 자식만 요구하기

-  `PropTypes.element`를 이용해 컴포넌트의 자식들(Children)에 단 하나의 자식(Child)만이 전달될 수 있도록 명시할 수 있다.



#### 2) 초기 Prop 값 ⭐⭐⭐⭐⭐- main페이지 활용 가능 

- defaultProps 프로퍼티를 할당함으로써 props 의 초깃값을 정의할 수 있다.

- ```react
  class Greeting extends React.Component {
    render() {
      return (
        <h1>Hello, {this.props.name}</h1>
      );
    }
  }
  
  // props의 초깃값을 정의합니다.
  Greeting.defaultProps = {
    name: 'Stranger'
  };
  
  // "Hello, Stranger"를 랜더링 합니다.
  ReactDOM.render(
    <Greeting />,
    document.getElementById('example')
  );
  ```

  