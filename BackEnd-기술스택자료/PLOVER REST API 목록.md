# PLOVER REST API 목록 

![슬라이드1](https://user-images.githubusercontent.com/70404643/105282536-ee687080-5bf1-11eb-9403-8bff52a48516.PNG)

---

## URL Rules

1. ### 마지막에 / 포함하지 않는다.

   - **Bad**

   ```
   http://api.test.com/users/
   ```

   - **Good**

   ```
   http://api.test.com/users
   ```

2. ### _(underbar) 대신 -(dash)를 사용한다.

   - **Bad**

   ```
   http://api.test.com/users/post_commnets
   ```

   - **Good**

   ```
   http://api.test.com/users/post-commnets
   ```

3. ### 소문자를 사용한다.

   - **Bad**

   ```
   http://api.test.com/users/postCommnets
   ```

   - **Good**

   ```
   http://api.test.com/users/post-commnets
   ```

4. ### 행위(method)는 URL에 포함하지 않는다.

   - **Bad**

   ```
   POST http://api.test.com/users/1/delete-post/1
   ```

   - **Good**

   ```
   DELETE http://api.test.com/users/1/posts/1
   ```

5. ### 컨트롤 자원을 의미하는 URL은 예외적으로 동사를 허용한다.

   - **Bad**

   ```
   http://api.test.com/posts/duplicating
   ```

   - **Good**

   ```
   http://api.test.com/posts/duplicate
   ```

---

## PLOVER REST API 

| Mapping | Resource   |                  GET                   |          POST           |            PUT            |         DELETE          | 우선순위 |
| ------- | ---------- | :------------------------------------: | :---------------------: | :-----------------------: | :---------------------: | :------: |
| user    | /users     |            유저 목록을 리턴            | 메서드를 허용 안함(405) | 대량의 유저 정보 업데이트 |   유저 정보 전체 삭제   |    상    |
|         | /users/711 |          해당 유저 정보 반환           | 메서드를 허용 안함(405) |  해당 유저 정보 업데이트  |   해당 유저 정보 삭제   |    상    |
|         | /signup    |                                        |                         |                           |                         |          |
|         | /fnumbers  |            기수 목록을 리턴            | 메서드를 허용 안함(405) |  메서드를 허용 안함(405)  | 메서드를 허용 안함(405) |    상    |
|         | /campuses  |           캠퍼스 목록을 리턴           | 메서드를 허용 안함(405) |  메서드를 허용 안함(405)  | 메서드를 허용 안함(405) |    상    |
|         | /email     |         중복 이메일 여부 확인          | 메서드를 허용 안함(405) |  메서드를 허용 안함(405)  | 메서드를 허용 안함(405) |    상    |
|         | /nickname  |         중복 닉네임 여부 확인          | 메서드를 허용 안함(405) |  메서드를 허용 안함(405)  | 메서드를 허용 안함(405) |    상    |
|         | /password  | 영문,숫자,특문이 포함된 8자리인지 확인 | 메서드를 허용 안함(405) |  메서드를 허용 안함(405)  | 메서드를 허용 안함(405) |    상    |
| 로그인  | /login     |                 입력된                 | 메서드를 허용 안함(405) |  메서드를 허용 안함(405)  | 메서드를 허용 안함(405) |    상    |
|         |            |                                        |                         |                           |                         |          |
|         |            |                                        |                         |                           |                         |          |
|         |            |                                        |                         |                           |                         |          |
|         |            |                                        |                         |                           |                         |          |
|         |            |                                        |                         |                           |                         |          |
|         |            |                                        |                         |                           |                         |          |
|         |            |                                        |                         |                           |                         |          |
|         |            |                                        |                         |                           |                         |          |
|         |            |                                        |                         |                           |                         |          |
|         |            |                                        |                         |                           |                         |          |
|         |            |                                        |                         |                           |                         |          |
|         |            |                                        |                         |                           |                         |          |
|         |            |                                        |                         |                           |                         |          |
|         |            |                                        |                         |                           |                         |          |
|         |            |                                        |                         |                           |                         |          |















## 참고자료

---

- [REST API 설계 해보기](https://digitalbourgeois.tistory.com/54)
- [보다나은 Rest API를 위한 10가지 best practice](https://multifrontgarden.tistory.com/252)
- [REST 아키텍처를 훌륭하게 적용하기 위한 몇 가지 디자인 팁](https://spoqa.github.io/2012/02/27/rest-introduction.html)