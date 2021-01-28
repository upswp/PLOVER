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

[google.docs 바로가기](https://docs.google.com/spreadsheets/d/1uSulKfJdjALKZu5AmXACP1qdH-cQ86lPN2OeFxzUpW4/edit?usp=sharing)



## 참고자료

---

- [REST API 설계 해보기](https://digitalbourgeois.tistory.com/54)
- [보다나은 Rest API를 위한 10가지 best practice](https://multifrontgarden.tistory.com/252)
- [REST 아키텍처를 훌륭하게 적용하기 위한 몇 가지 디자인 팁](https://spoqa.github.io/2012/02/27/rest-introduction.html)