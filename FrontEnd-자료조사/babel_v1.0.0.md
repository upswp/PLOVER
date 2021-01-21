#### babel에 대하여

1. 바벨이란 ?<br>
    입력과 출력이 모두 자바스크립트코드인 컴파일러이다.
    초기바벨은 ES6코드를 ES5코드로 변환해 주는 컴파일러였다. 
    현재는 바벨을 이용해서 JSX문법,타입스크립트와 같은 정적타입 언어,코드 압축,제안 단계에 있는 문법등을 사용할 수 있다.
<br>
2. 바벨 실행방식
    - @babel/cli로 실행
    - 웹팩에서 babel-loader로 실행
    - @babel/core를 직접실행
    - @babel/register를 require하여 사용
<br>

3. 바벨 실습해보기


- `우선 프로젝트를 생성한다`.
```bash
$ mkdir babel-test
$ cd babel-test
$ npm init -y
```
- `필요한 패키지들을 설치한다.`
```bash
$ npm install @babel/core @babel/cli @babel/plugin-transform-arrow-functions \
@babel/plugin-transform-template-literals @babel/preset-react

@babel/core : 바벨사용시 반드시 필요한 패키지
@babel/cli : 커맨드라인에서 바벨을 실행할 수 있는 바이너리파일이 포함
@babel/plugin-transform-arrow-functions : arrow function을 ES5로 컴파일
@babel/plugin-transform-template-literals : `foo${bar}`와 같은 템플릿 리터럴을 "foo".concat(bar)와 같은 ES5로 컴파일
@babel/preset-react : 리액트앱 만들때 필요한 플러그인의 집합
```
> 자바스크립트 파일 변환작업은 플러그인 단위로 이루어진다. 두번의 변환이 일어나면 두개의 플러그인이 사용되는데, 여러개의 플러그인의 집합을 프리셋(preset)이라고 한다. 예로 babel-preset-minify 프리셋은 압축하는 플러그인을 모아놓은 것이며, @babel/preset-react는 리액트앱을 만들때 필요한 플러그인들을 모아놓은 프리셋이다.

- `ES6문법으로 작성된 코드를 준비한다. (code.js 작성)`
```javascript
const foo = "good";
const element = <div>babel test</div>;
const text = `ssafy is ${foo}`;
const squared = (a,b) => a**b;
```

- `@babel/cli로 실행해보기`
```bash
$ npx babel code.js --presets=@babel/preset-react \
--plugins=@babel/plugin-transform-template-literals,@babel/plugin-transform-arrow-functions
```    
> ES5문법으로 변환된 결과가 콘솔에 출력될것이다.


```
babel.config.js 작성
const presets = ['@babel/preset-react'];
const plugins = [
    '@babel/plugin-transform-template-literals',
    '@babel/plugin-transform-arrow-functions'
];
module.exports = {presets,plugins};
```
>설정값이 많거나 실행환경에 따라 다를경우 설정파일을 따로 만들어서 설정값을 관리할수도있다.
```bash
컴파일결과를 파일로 저장하고 싶다면
$ npx code.js --out-file dist.js

폴더단위로 처리하고 싶다면
$ npx src --out-dir dist
```

- `webpack의 babel-loader로 바벨 사용하기`
```bash
추가적인 패키지를 설한다.
$ npm install webpack webpack-cli babel-loader
```
```
webpack.config.js 파일작성
const path = require('path');
module.exports = {
    //번들링할 파일지정
    entry: './code.js',
    //번들링결과를 어디에 저장할 것인지
    output: {
        path: path.resolve(__dirname,'dist');
        filename: 'code.bundle.js'
    },
    //js파일들을 babel-loader가 처리
    //babel-loader는 babel.config.js파일의 내용을 설정값으로 사용한다.
    module:{
        rules: [{ test: /\.js$/, use: 'babel-loader'}],
    },
    //웹팩은 기본적으로 압축을진행하는데, 압축기능을 끈다.
    optimization: { minimizer:[] },
};
```
```bash
webpack 실행
$ npx webpack
```
> ES5로 변환된 코드가 저장된다.

- `@babel/core로 직접 실행하기`
```javascript
//complie.js 를 작성한다.
const babel = require('@babel/core');
const fs = require('fs');

const filename = './code.js';
const source = fs.readFileSync(filename,'utf-8');
const presets = ['@babel/preset-react'];
const plugins = [
    '@babel/plugin-transform-template-literals',
    '@babel/plugin-transform-arrow-functions',
];
//transformSync함수를 사용해서 바벨실행
const { code } = babel.transformSync(source,{
    filename,
    presets,
    plugins,
    configFile: false,//babel.config.js를 참조하지 않는다.
});

console.log(code);
```
```bash
작성한 javascript파일을 실행해보자.
$ node complie.js 
```
- @babel/core를 사용하면 AST를 재사용하여 자유도 높은 컴파일이 가능하다.
```
예를 들어 2가지 설정이 존재한다고 가정해보자
//설정 1
const presets = ['@babel/preset-react'];
const plugins = ['@babel/plugin-transform-template-literals'];

//설정 2
const presets = ['@babel/preset-react'];
const plugins = ['@babel/plugin-transform-arrow-functions'];
각각 설정에 대한 결과값을 모두 보기위해서는 2번 바벨을 실행해야할것이다.
그러나 @babel/core를 사용해 AST를 활용한다면 단 한번만 바벨을 실행해도된다.
```
> AST란 ? 코드의 구문이 분석된 결과를 담고 있는 구조체
```javascript
const babel = require('@babel/core');
const fs = require('fs');

const filename = 'code.js';
const source = fs.readFileSync(filename,'utf-8');
const presets = ['@babel/preset-react'];

const { ast } = babel.transformSync(source,{
    filename,
    ast: true,
    code: false,
    presets,
    configFile:false,
});
//코드는 생성하지 않고 ast만 생성

const { code: code1 } = babel.transformFromAstSync(ast,source,{
    filename,
    plugins:['@babel/plugin-transform-template-literals'],
    configFile: false,
});
//preset-react가 반영된 ast로 부터 @babel/plugin-transform-template-literals 플러그인 반영

const { code: code2 } = babel.transformFromAstSync(ast,source,{
    filename,
    plugins:['@babel/plugin-transform-arrow-functions'],
    configFile: false,
});
//preset-react가 반영된 ast로 부터 @babel/plugin-transform-arrow-functions 플러그인 반영

console.log(code1);
console.log(code2);
```
- 바벨 설정파일에서 사용가능한 다양한 속성중 extends 속성은 다른설정파일을 가져와 확장할 수 있다.
- env or overrides 속성은 환경별,파일별로 다른설정적용이 가능하다.
```bash
우선 새로운 프로젝트를 생성하자.
$ mkdir babel-config
$ cd babel-config
$ npm init -y
$ npm install @babel/core @babel/cli @babel/plugin-transform-arrow-functions \
@babel/plugin-transform-template-literals @babel/preset-react babel-preset-minify

그리고 디렉터리를 하나 생성후
$ mkdir common
$ cd common
디렉터리 안에 .babelrc(지역설정파일)를 작성한다.
{
    "presets":["@babel/preset-react"],
    "plugins":[
        [
            "@babel/plugin-transform-template-literals",
            {
                "loose":true //문자열 연결시 concat대신 + 사용
            }
        ]
    ]
}
그리고 디렉터리를 하나더 생성한다.
$ cd ..
$ mkdir src
$ cd src
src폴더 밑에 .babelrc파일을 작성한다.
{
    "extends": "../common/.babelrc", //extends속성을 사용하여 다른 파일의 설정을 가져옴
    "plugins":[
        "@babel/plugin-transform-arrow-functions",
        "@babel/plugin-transform-template-literals" //extends로 가져온 loose옵션은 사라진다.
    ]//가져온 설정에 추가적으로 플러그인추가
}
code.js를 작성한다.
const foo = "good";
const element = <div>babel test</div>;
const text = `ssafy is ${foo}`;
const squared = (a,b) => a**b;

$ npx babel code.js
결과적으로 콘솔에서 preset-react와 arrow펑션,템플릿리터럴 플러그인이 적용되어 컴파일된 코드를 볼수있다.
```
- env 속성을 사용하여 환경별로 다르게 설정값을 적용할 수 있다.
```bash
src폴더 밑에 example-env폴더를 생성한다.
$ mkdir example-env

.babelrc 파일을 작성한다.
{
    "presets":["@babel/preset-react"],
    "plugins": [
        "@babel/plugin-transform-template-literals",
        "@babel/plugin-transform-arrow-functions"
    ],
    "env":{
        "production":{
            "presets":["minify"]
        }
    }
}
code.js파일을 src폴더에 있는 code.js파일과 동일하게 생성한다.
$ NODE_ENV=production npx babel ./src/example-env
```
> production환경일때는 minify가 적용되어 코드를 읽기가 힘들다.

- overrides 속성으로 파일별로 설정하기
```
src폴더 밑에 example-overrides 폴더를 만든다. example-overrides 폴더 밑에 .babelrc 파일을 만든 다음 내용을 입력해보자.
.babelrc
{
    "presets":["@babel/preset-react"],
    "plugins":["@babel/plugin-transform-template-literals"],
    "overrides":[
        {
            "include":"./service1",//service1폴더 밑 파일에 밑에plugins 적용
            "exclude":"./service1/code2.js",//service1/code2.js는 적용안함
            "plugins":["@babel/plugin-transform-arrow-functions"]
        }
    ]
}
example-overrides폴더 밑에 service1폴더를 생성후 code1.js와 code2.js를 작성한다.
$ npx babel ./example-overrides
```
> include된 파일들은 arrow function 변환이 일어나고, exclude된 파일들은 변환이 안일어난다.

- 전체 설정파일과 지역설정 파일이 있다. 전체설정은 babel.config.js 지역설정은 .babelrc파일이다.
```bash
mkdir babel-config2
cd babel-config2
npm init -y
npm install @babel/core @babel/cli @babel/plugin-transform-arrow-functions @babel/plugin-transform-template-literals @babel/preset-react

babel.config.js파일을 만든다.
const presets = ['@babel/preset-react'];
const plugins = [
    [
        '@babel/plugin-transform-template-literals',
        {
            loose:true,
        },
    ],
];
module.exports = { presets, plugins };

src/service1/.babelrc 파일을 만든다.
{
    "plugins":[
        "@babel/plugin-transform-arrow-functions",
        "@babel/plugin-transform-template-literals"
    ]
}
code.js 파일을 만든다.
$ npx babel src
js파일은 .babelrc or package.json or babel.config.js를 만날때까지 부모로 이동한다.
그리고 만나면 설정을 적용후 전체설정파일을 병합하여 적용한다.
```

- 폴리필 : 런타임에 기능을 주입하는 것(기능이 존재하는지 확인후 없다면 주입)
- 바벨을 사용하더라도 폴리필에 대한 설정을 별도로해야함.
- core-js모듈은 폴리필을 위해 공식적으로 지원하는 패키지.
```javascript
import 'core-js' //core-js의 모든 폴리필이 포함됨

const p = Promise.resolve(10);
const obj = {
    a: 10,
    b: 20,
    c: 30,
};
const arr = Object.values(obj);
const exist = arr.includes(20);
```
```
웹팩의 경우 entry속성에 core-js 모듈을 넣는다.
module.exports={
    entry:['core-js','./src/index.js'],
    //...
};
```
```javascript
import 'core-js/featrues/promise';
import 'core-js/features/object/values';
import 'core-js/features/array/includes';
//필요한 모듈들만 포함시킬수도있다.

const p = Promise.resolve(10);
const obj = {
    a: 10,
    b: 20,
    c: 30,
};
const arr = Object.values(obj);
const exist = arr.includes(20);
```
- @babel/preset-env 프리셋은 실행환경에 대한 정보를 설정해주면 자동으로 필요한 기능을 주입해줄수 있다.
```
babel.config.js의 예
const presets = [
    [
        '@babel/preset-env',
        {
            target: '> 0.25%, not dead', //시장점유율이 0.25%이상인 지원중 브라우저를 타겟으로 설정
        },
    ]
];
module.exports = { presets };
```
