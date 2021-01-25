#### webpack

##### webpack이란 ?
- 웹팩은 모듈 번들러이다. 모듈은 각 리소스 파일을 말하며, 번들은 웹팩 실행후 나오는 결과파일이다. 번들은 여러 모듈을 포함하고 있는 파일이다.


##### webpack의 이점
- 모듈화된 코드를 번들링하여 쉽게 배포할수 있다.
- 스크립트 파일의 개수는 스크립트 로드에 영향을 준다. 허나 번들링된 파일은 그러한 문제를 해결한다.
- 과거 script src로 모듈들을 가져오는 방식은 전역변수를 덮어쓸 위험과 실행순서를 고려해야한다는 문제점이 있으나 웹팩은 이를 해결한다.

##### webpack 실행

- 웹팩을 실행하기 위해서는 webpack과 webpack-cli(cli에서 webpack 실행가능)를 설치해야한다.

```bash
$ mkdir webpack-init
$ cd webpack-init
$ npm init -y
$ npm install webpack webpack-cli
```

- src폴더를 만들고 그 밑에 util.js를 만든다.

```javascript
export function sayHello(){
    console.log('hello !');
}
```

- src폴더 밑에 index.js를 만든다.

```javascript
import { sayHello } from './util';

function func(){
    sayHello();
}

func();
```

- 프로젝트 루트에서 웹팩실행

```bash
$ npx webpack
```

> 아무런 설정도 없으면 입력으로 ./src/index.js 출력으로 ./dist/main.js 번들을 만든다.

##### 설정파일 이용방법
- webpack은 webpack.config.js를 설정파일로 사용한다.
- webpack.config.js를 만들어보자

```javascript
const path = require('path');

module.exports = {
    entry: './src/index.js', //입력경로,파일
    output: {
        filename: 'main.js', //출력파일
        path: path.resolve(__dirname,'dist'),//출력경로
    },
    mode:'production', //프로덕션모드로 설정하면 코드압축을 포함한
    //최적화 기능이 들어간다.
    optimization: {minimizer:[]},//압축기능은 끈다.
}
```

- webpack을 실행하면 설정파일에 설정된 내용을 바탕으로 번들링을 수행한다.

```bash
$ npx webpack
```

##### 로더 사용하기

- project 생성

```bash
$ mkdir webpack-loader

$ cd webpack-loader

$ npm init -y

$ npm install webpack webpack-cli

$ npm install babel-loader @babel/core @babel/preset-react react react-dom
// webpack에서 바벨을 사용하기위한 babel-loader와 리액트 코드를 처리하기위한 패키지 설치
```

- src 폴더 밑에 index.js를 작성한다.

```javascript
import React from "react";
import ReactDOM from "react-dom";

function App(){
    return (
        <div className="container">
            <h3 className="title">webpack</h3>
        </div>
    );
}

ReactDOM.render(<App />,document.getElementById('root'));
```

- 프로젝트 루트에 babel.config.js 작성

```javascript
const presets = ['@babel/preset-react'];
module.exports ={ presets };
```

- 프로젝트 루트에 webpack.config.js 작성

```javascript
const path = require("path");

module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'main.js',
        path: path.resolve(__dirname,'dist'),
    },
    module:{
        rules:[
            {
                test: /\.js$/, //js확장자를 갖는 모듈을 babel-loader가 처리하도록함
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
    mode:'production',
}
```

- dist폴더 밑에 index.html을 생성한다.

```javascript
<html>
    <body>
        <div id="root" />
        <script src="./main.js"></script>
    </body>
</html>
```

```
npx webpack
```

> webpack 실행후 index.html을 실행하면 잘 동작한다.

- css파일처리를 위해서는 css-loader를 사용해야한다.

```bash
$ npm install css-loader
```

- src폴더 밑에 App.css를 생성한다.

```css
.container{
    border:1px solid blue;
}

.title{
    color: red;
}
```

- index.js파일에 App.css파일을 import한다

```javascript
import Style from './App.css';
//...
```

- webpack.config.js에 css-loader를 적용한다.

```javascript
//...
module: {
    rules:[
        //...
        {
            test: /\.css$/,
            use: 'css-loader',
        },
        //...
    ]
}
//...
```

- import한 css를 style태그로 자동으로 삽입하기 위해서 style-loader를 사용한다.

```bash
$ npm install style-loader
```

- webpack.config.js에 css-loader를 적용한다.

```javascript
//...
module: {
    rules:[
        //...
        {
            test: /\.css$/,
            use: ['style-loader','css-loader'],//오른쪽부터 실행됨
            //css-loader가 먼저 css데이터를생성하고, style-loader가 style태그로 삽입
        },
        //...
    ]
}
//...
```

> css-loader는 @import,url()등도 처리한다.

- JSON파일의 경우 웹팩에서 기본적으로 처리해주고 나머지 파일들은 별도의 로더를 설치해야한다.

##### 플러그인

- 플러그인은 로더보다 강력한 기능을 갖는다. 로더는 특정 모듈에 대한 처리만 담당하지만 플러그인은 웹팩 실행 전체과정에 개입한다.

```bash
$ mkdir webpack-plugin

$ cd webpack-plugin

$ npm init -y

$ npm install webpack webpack-cli
```

- src폴더에 index.js파일을 만든다.

```javascript
import React from 'react';
import ReactDom from 'react-dom';

function App(){
    return (
        <div>
            <h3>안녕하세요. 웹팩 플러그인 예제입니다.</h3>
            <p>html-webpack-plugin 플러그인을 사용합니다.</p>
        </div>
    )
}

ReactDom.render(<App />,document.getElementById('root'));
```

- 필요한 패키지들 설치

```bash
$ npm install @babel/core @babel/preset-react babel-loader react react-dom
```

- 필요한 플러그인들 설치

```bash
$ npm install clean-webpack-plugin html-webpack-plugin
```

- webpack.config.js 작성

```javascript
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output:{
        filename: '[name].[chunkhash].js', 
        //chunkhash를 사용하면 번들을할때마다 파일이름이 바뀜
        path: path.resolve(__dirname,'dist'),
    },
    module:{
        rules:[{
            test:/\.js$/,
            use:{
                loader: 'babel-loader',
                options:{
                    presets:['@babel/preset-react'],
                },//babel.config.js를 이용할수도 있지만
                //options를 사용해 웹팩안에서도 바벨설정이가능하다.
            },
        }],
    },
    plugins:[
        new CleanWebpackPlugin(), 
        //웹팩이 실행될때마다 dist폴더를 정리함
        new HtmlWebpackPlugin({
            template:'./template/index.html' 
        }),
        //./template/index.html을 기반으로
        //./dist/index.html파일이 자동생성됨
    ],
    mode:'production',
};
```

- ./template/index.html 작성

```html
<html>
<head>
    <title>
        웹팩플러그인
    </title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

```bash
$ npx webpack
```