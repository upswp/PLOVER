#### rollup

##### rollup이란 ?

- rollup은 webpack과 같은 번들러로써, 의존성이 있는 모듈코드를 하나 혹은 여러개의 파일로 만들어 주는 도구입니다.


##### rollup의 기능들

- rollup.config.js`파일을 통해 설정정보를 관리`할 수 있습니다.
- 플러그인들을 사용하여 `다양한 형태의 파일들을 자바스크립트형식` 또는 하위문법으로 변환할 수 있습니다.
-  `사용되지 않는 코드를 포함시키지 않고 번들링`이 가능합니다.(트리쉐이킹)
-  `플러그인을 통해 개발용서버`를 가동할 수 있습니다.


##### 번들러 중 rollup을 사용하기 좋은 때

- webpack은 ESM형태로 번들링을 할수가없어 ESM형태로 번들링을 하는 경우나, 트리쉐이킹과 같이 효율성을 고려하는 프로젝트에 좋습니다. 예로 라이브러리 개발에 매우 좋은 효율을 발휘합니다.

##### rollup.config.js

- 기본구조

```javascript
export default {
    input: 'src/main.js', //입력파일의 path/filename
    output: {
        file: 'bundle.js',//결과물파일의 path/filename
        format: 'cjs'//결과물 파일의 모듈방식 cjs
    }
}
```

- plugin 지정

```javascript
import babel from "rollup-plugin-babel"; //바벨 플러그인 import
import peerDepsExternal from 'rollup-plugin-peer-deps-external'; 
//peerDependencies로 설치한 라이브러리들을 번들링 결과에 포함시키지 않음(external)
//react와 react-dom를 제외하기 위함

export default {
    input: "./src/filename.jsx",
    output: {
        file: "./dist/bundle.esm.js",
        format: "es"
    },
    plugins:[
        peerDepsExternal(),
        babel({ runtimeHelpers: true }) 
        //polyfill을 사용하지않고, 라이브러리에서 사용하는 API들을 래핑
    ]//플러그인지정
}
```

- rollup으로 번들링 하는 방법
```bash
$ rollup -c 
//-c나 --config는 자동으로 rollup.config.js설정파일을 참조하여 번들링수행

$ rollup --config my.config.js
//config파일을 직접지정하여 번들링을 수행할 수도 있다.
```


- CRA안에 작성된 React 컴포넌트 모음 모듈을 rollup으로 번들링해보기

```bash
react 프로젝트를 먼저생성해보자
$ npx create-react-app rollup_test

$ cd rollup_test

$ npm uninstall react react-dom

$ yarn add --peer react react-dom

$ yarn add @babel/core rollup-plugin-babel rollup-plugin-peer-deps-external

소스파일을 다음과 같이 생성한다.

./src/components/index.js
export { Button } from "./button/Button"; 

./src/components/button/Button.js
import React from "react";

export function Button(props) {
    return (
        <div>{props.children}</div>
    );
};

$ vi rollup.config.js 작성
import babel from "rollup-plugin-babel"; //바벨 플러그인 import
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
//peerDependencies로 설치한 라이브러리들을 번들링 결과에 포함시키지 않음(external) 
//react와 react-dom를 제외하기 위함

export default {
    input: "./src/components/index.js",
    output: {
        file: "./dist/bundle.esm.js",
        format: "es"
    },
    plugins: [
        peerDepsExternal(),
        babel({ runtimeHelpers: true }) 
        //polyfill을 사용하지않고, 라이브러리에서 사용하는 API들을 래핑
    ]//플러그인지정
}

$ vi .babelrc 작성
{
    "presets": [
        "@babel/preset-react"
    ]
}

$ vi packge.json 수정
"scripts": {
    ...
    "bundle": "rollup -c"
  },

$ npm run bundle 실행
```

> 결과적으로 bundle파일이 dist폴더 밑에 생성된다.

