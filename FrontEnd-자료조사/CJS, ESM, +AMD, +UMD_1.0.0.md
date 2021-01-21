# CJS, ESM

##### 공유문서 읽기 전 주의

- 전달에 오해가 없도록 최대한 공식문서 기준으로 정리
- 내용, 코드 는 공식 문서를 기준으로 하되 표현 방식은 본인이 이해한 대로 서술👀😁
- 활용 가능할 것 같은 것들을 별표로 따로 표시 `⭐⭐⭐⭐⭐ - 활용가능한 페이지`
- 다른 문서들도 아래에 첨부해 둡니다 🙌🤷‍♂️👩‍🏫



- CJS, ESM 이외에 +AMD, +UMD 내용 추가 



##### 참고 사이트

1. 참고1

   : https://beomy.github.io/tech/javascript/cjs-amd-umd-esm/

2. 참고2

   : https://yceffort.kr/2020/08/commonjs-esmodules

3. 참고2

   : https://ko.javascript.info/modules-intro



-------------------

※ 이것이 무엇인고?

- 모듈 : 개발하는 애플리케이션의 크기가 커지면 언젠간 파일을 여러 개로 분리해야하는 시점이 오는데 이때 분리된 파일 각각을 모듈 이라고 부른다. 모듈을 대개 클래스 하나 혹은 특정한 목적을 가진 복수의 함수로 구성된 라이브러리 하나로 구성된다.

- 처음 자바스크립트는 모듈을 가져오거나 내보내는 방법이 없었다. AMD, CJS, ESM, UMD 가 개발된 후 이를 통해 모듈로 개발 후 배포 가능해 졌다.
- 간단요약
  - [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) – 가장 오래된 모듈 시스템 중 하나로 [require.js](http://requirejs.org/)라는 라이브러리를 통해 처음 개발되었습니다.
  - [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) – Node.js 서버를 위해 만들어진 모듈 시스템입니다.
  - [UMD](https://github.com/umdjs/umd) – AMD와 CommonJS와 같은 다양한 모듈 시스템을 함께 사용하기 위해 만들어졌습니다.
- 대부분 주요 브라우저와 Node.js 가 모듈 시스템을 지원하고 있다.



------------------



### - 자바스크립트 모듈 개념 정리 (AMD, CJS, ESM, UMD)

#### 1) AMD (Ansynchronous Module Deifinition)

- 모듈을 비동기적으로 불러온다.

- Front-End 용

- AMD 사용법

  ```
  // 종속성을 갖는 모듈인 'package/lib'를 모듈 선언부의 첫 번째 파라미터에 넣으면,
  // 'package/lib'은 콜백 함수의 lib 파라미터 안에 담긴다.
  define(['package/lib'], function (lib) {
  
    // 로드된 종속 모듈을 아래와 같이 사용할 수 있다.
    function greeting () {
      lib.log('hello world!');
    }
  
    // 생성된 greeting 함수는 리턴을 통해 greetingbar라는 이름의 다른 모듈로 추출될 수 있다.
    return {
      greetingbar: greeting
    };
  });
  ```

  선언된 모듈들을 아래와 같이 require로 사용할 수 있다.

  ```
  require(['package/myModule'], function (myModule) {
    myModule.greetingbar();
  });
  ```

  



#### 2) CJS (Common JS)

- Node.js의 모듈 시스템에 사용

- 모듈을 동기적으로 불러옴

- Back-End 용

- ##### CJS 사용법

  ```
  // 아래와 같이 require을 통해 package/lib 모듈을 변수에 담을 수 있다.
  let lib = require('package/lib');
  
  // 가져온 모듈을 아래와 같이 사용할 수 있다.
  function greeting () {
    lib.log('hello world!');
  }
  
  // greeting 함수를 다른 파일에서 사용할 수 있도록, 다른 모듈로 추출될 수 있다.
  exports.greetingbar = greeting;
  ```

  



#### 3) ESM (ES Modules)

- CJS 문법 + AMD 비동기 로드 , 이전의 각 모듈 시스템의 장점을 채택

- 표준 자바스크립트 모듈 시스템으로 기획

- ES6에 자바스크립트 모듈 기능이 추가

- ##### ESM 사용법

  ```
  import lib from 'package/lib';
  
  function greeting () {
    lib.log('hello world!');
  }
  
  export {
    greetingbar: greeting
  };
  ```

  



#### 4) UMD (Universal Module Definition)

- 여러 모듈 시스템을 동작 가능하게 함
- Front, Back  양쪽에서 사용 가능



