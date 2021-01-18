![이미지](./images/title.gif)
<br>
![JAVA](https://img.shields.io/badge/-JAVA-gray?Style=flat&logo=Java&logoColor=61DAFB)
![Apache Maven](https://img.shields.io/badge/-Apache_Maven-gray?Style=flat&logo=Apache-Maven&logoColor=C71A36)
![SpringBoot](https://img.shields.io/badge/SpringBoot-gray?Style=flat&logo=Spring&logoColor=6DB33F)
![Swagger](https://img.shields.io/badge/Swagger-gray?Style=flat&logo=Swagger&logoColor=85EA2D)
![SpringDataJPA](https://img.shields.io/badge/SpringDataJPA-gray?Style=flat)
![SpringSecurity](https://img.shields.io/badge/SpringSecurity-gray?Style=flat)
![AWS_EC2](https://img.shields.io/badge/AWS_EC2-gray?Style=flat&logo=Amazon-AWS&logoColor=FF9900)
![AWS_RDS](https://img.shields.io/badge/AWS_RDS-gray?Style=flat)
![Redis](https://img.shields.io/badge/Redis-gray?Style=flat&logo=Redis&logoColor=DC382D)


![React](https://img.shields.io/badge/React-gray?Style=flat&logo=React&logoColor=61DAFB)
![HTML5](https://img.shields.io/badge/-HTML5-gray?Style=flat&logo=HTML5&logoColor=E34F26)
![Sass](https://img.shields.io/badge/-Sass-gray?Style=flat&logo=Sass&logoColor=CC6699)
![CSS3](https://img.shields.io/badge/-CSS3-gray?Style=flat&logo=CSS3&logoColor=1572B6)
![JavaScript](https://img.shields.io/badge/-JavaScript-gray?Style=flat&logo=JavaScript&logoColor=F7DF1E)

![MariaDB](https://img.shields.io/badge/MariaDB-gray?Style=flat&logo=MariaDB&logoColor=61DAFB)


> SSAFY 프로젝트 공통 Web Sub 1 Project 


---

<br>

# 1. :grin: 서비스 소개

* SSAFY 기수별로 취업정보, 스터디정보를 공유할 수 있는 플랫폼 입니다.

---

<br>

# 2. :two_men_holding_hands: 팀원 소개

* [박상우](https://github.com/upswp)
* [윤기현](https://github.com/KiHyeonYun)
* [임장순](https://github.com/color0e), **추가 github**:: https://github.com/rosenari
* [이아영](https://github.com/LeeA0)
* [박지영](https://lab.ssafy.com/reachgoal321)
* [차수연](https://github.com/pepprbell)

<br>

---

# 3. :computer: 핵심 기능

* 회원 정보 입력 후 회원 가입 실시
  * 닉네임, 이메일, password, 지역, 성별 등 개인 정보 입력
* 이메일 중복체크
  * 가입시 이메일 중복 여부를 확인합니다.
* 닉네임 중복체크
  * 가입시 닉네임 중복 여부를 확인합니다.
* 회원가입 후 이메일 인증
  * 입력한 이메일로 이메일 인증 서비스를 진행합니다.
* 이메일 인증 확인
  * 이메일 인증 확인 진행을 합니다.
* 비밀전호 변경 메일 확인
  * 비밀번호 변경시 가입한 이메일로 메일을 발송합니다.
* 비밀번호 변경
  * 사용자가 비밀번호 변경 기능을 진행합니다.
* 다른페이지로 이동 가능한지 확인
  * 로그인/비로그인 시 이동이 가능한지 확인합니다.

---


- [모던자바스크립트 기초](https://github.com/rosenari/javascriptinfo/tree/main/%ED%8C%8C%ED%8A%B81%EC%A0%95%EB%A6%AC)
- [리액트 기초](https://github.com/rosenari/reactinfo) `참고한 책: 실전 리액트 프로그래밍 - 이재승`
- [styled-components](https://styled-components.com/)
- [d3-geo](https://github.com/d3/d3-geo/blob/v2.0.0/README.md) 
- [d3-selection](https://github.com/d3/d3-selection/tree/v2.0.0)

#### 회원가입
![이미지](./images/nickname.gif)

`닉네임`
- 리액트 훅(useState, useCallback, useEffect)을 사용하여 상태,함수,부수효과(렌더링후 작업)를 설정하였습니다.
- styled-components를 활용해 요소들을 스타일링 하였습니다.
- axios를 활용해 비동기 요청(닉네임 중복확인)을 구현하였습니다.

![이미지](./images/email.gif)

`아이디`
- 리액트 훅(useState, useCallback, useEffect)을 사용하여 상태,함수,부수효과(렌더링후 작업)를 설정하였습니다.
- styled-components를 활용해 요소들을 스타일링 하였습니다.
- axios를 활용해 비동기 요청(이메일 중복확인)을 구현하였습니다.
- 정규표현식을 사용해 이메일 형식을 검사하도록 하였습니다.

![이미지](./images/password.gif)

`패스워드`
- 리액트 훅(useState, useCallback, useEffect)을 사용하여 상태,함수,부수효과(렌더링후 작업)를 설정하였습니다.
- styled-components를 활용해 요소들을 스타일링 하였습니다.
- 정규표현식을 사용해 패스워드 형식을 검사하도록 하였습니다.

![이미지](./images/gender.gif)

`성별`
- 리액트 훅(useState, useEffect)을 사용하여 상태,부수효과(렌더링후 작업)를 설정하였습니다.
- styled-components를 활용해 요소들을 스타일링 하였습니다.

![이미지](./images/city.gif)

`도시선택`
- 투영법은 3차원 지구의 곡면을 2차원 평면상에 표현하기위한 방법입니다.
- 다양한 투영법 중 메르카토르도법은 북쪽,남쪽으로 갈수록 좁아지는 위의 지도에서 세로선을 평행선으로 수정한 도법입니다. (북쪽 남쪽일수록 실제 비율보다 넓어짐)
- d3 모듈들 중 d3-selection과 d3-geo를 사용하면 geoJson으로 제공된 우리나라의 도시 경계좌표를 메르카토르 도법 지도 위에 표현할 수 있습니다.
- 각 도시 Element에 마우스오버,아웃,클릭 리스너를 달아 도시선택을 구현하였습니다.

`가입하기`
- 부모 컴포넌트에서 상태변경함수를 자식으로 전달, 자식컴포넌트에서 부모에서 관리되는 상태값을 갱신하도록 하여 가입필수항목을 모두 입력하였는지 확인 및 가입하기 버튼이 활성화되도록 구현했습니다.
- axios를 활용해 비동기 요청(가입하기)을 구현하였습니다.
---

<br>

# 4. :department_store: 프로젝트 구조

![image-20210115103154545](./images/diagram.png)

---

<br>

# 5. :video_game: 기술 스택

* Spring Boot
* Spring Data JPA
* Spring Security
* React
* MariaDB
* AWS EC2
* Redis

---

<br>

# 6. :open_file_folder: 업데이트 내역

* 21-01-11
  * 프로젝트 생성 및 기술스택 회의
  * 아이디어 회의
  * 역할분배
* 21-01-12
  * 프론트 기술스택 관련 조사
  * 백앤드 기술스택 관련 조사
* 21-01-13
  * 프론트 기본기능 개발 
  * 백앤드 기본기능 개발 
* 21-01-14
  * 프론트 심화기능 개발
  * 백앤드 심화기능 개발
* 21-01-15
  * 서류 정리 
  * 최종 확인

---

<br>

# 7. :pencil2: 추가 정보

- 이메일 주소 : tkddnsos@gmail.com