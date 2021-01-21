# Sass, Scss, +PostCSS

##### 공유문서 읽기 전 주의

- 전달에 오해가 없도록 최대한 공식문서 기준으로 정리
- 내용, 코드 는 공식 문서를 기준으로 하되 표현 방식은 본인이 이해한 대로 서술👀😁
- 활용 가능할 것 같은 것들을 별표로 따로 표시 ⭐⭐⭐⭐⭐ - 활용가능한 페이지

- 다른 문서들도 아래에 첨부해 둡니다 🙌🤷‍♂️👩‍🏫



##### - PostCSS 참고 사이트

1. PostCSS

   : https://postcss.org/

2. PostCSS Plugins

   : https://www.postcss.parts/

3. Plugins Github 페이지

   : https://github.com/postcss/postcss/blob/main/docs/plugins.md



----------------------------------

##### - SASS, SCSS 개념 및 사용법 참고 사이트

1. 참고1

   : https://heropy.blog/2018/01/31/sass/

2. 참고2

   : https://velog.io/@jch9537/CSS-SCSS-SASS

3. 참고3

   : https://designmeme.github.io/ko/blog/write-sass-with-scss/



-------------------

※ 

- 불필요한 선택자의 과용, 연산 기능의 한계 등으로 전처리기 등을 사용
- 

------------------

### 1. PostCSS

- CSS 전처리기
- SASS, LESS 와 달리 간편하며 다양한 플러그인을 사용할 수 있다. 
- Create react app 에 이미 설치되어 있음
- 모듈화가 가능해서 snakecase 쓰지 않아도 된다.
- 최신 트렌드 ↓↓↓
- ![image](/uploads/b016c491176706015107583fad21bf05/image.png)



#### 사용법

##### 1. component 안의 css 파일이름 ex) button.css --> button.module.css 로 변경

##### 2. import styles from './button.module.css';  로 변경

##### 3. 태그안에 class 지정 방법 (styles를 붙여줌) 

EX )

```
<div className={styles.button}>
```







### 2. Sass (Syntactically Awesome StyleSheets), SCSS 

-  CSS pre-processor로서 CSS의 한계와 단점을 보완하여 보다 가독성이 높고 코드의 재사용에 유리한 CSS를 생성하기 위한 CSS의 확장(extension)이다.

- CSS의 간결한 문법은 배우기 쉬우며 명확하여 프로젝트 초기에는 문제가 없이 보이지만 프로젝트의 규모가 커지고 수정이 빈번히 발생함에 따라 쉽게 지저분해지고 유지보수도 어려워지는 단점도 가지고 있다.

- 이러한 CSS의 태생적 한계를 보완하기 위해 Sass는 다음과 같은 추가 기능과 유용한 도구들을 제공한다.
  - 변수의 사용
  - 조건문과 반복문
  - Import
  - Nesting
  - Mixin
  - Extend/Inheritance

- CSS와 비교하여 Sass는 아래와 같은 장점이 있다.
  - CSS보다 심플한 표기법으로 CSS를 구조화하여 표현할 수 있다.
  - 스킬 레벨이 다른 팀원들과의 작업 시 발생할 수 있는 구문의 수준 차이를 평준화할 수 있다.
  - CSS에는 존재하지 않는 Mixin 등의 강력한 기능을 활용하여 CSS 유지보수 편의성을 큰 폭으로 향상시킬 수 있다.

### 



