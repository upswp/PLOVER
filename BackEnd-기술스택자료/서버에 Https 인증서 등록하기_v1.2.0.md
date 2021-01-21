# 서버에 Https 인증서 등록하기

```
!!!가장 기초적인 방법!!!
실사용은 인증서_Let’s Encrypt.md 문서 참조
```

## 용어 정의

### Http

- 클라이언트와 서버 양쪽에서 통신할 수 있도록 구현해야하는 기본 통신 프로토콜

- 요청과 응답, 세션, 캐싱, 인증 등을 다룸. 

- 현재 널리 사용되는 버전은 1.1

- 브러우저와 서버 사이에서 정보를 평문으로 전송함

  -> 정보가 전달되는 네트워크에서 전송되는 정보를 엿볼 수 있음

### Http/2

- HTTP의 다음 업그레이드 버전
- 지연을 줄이고 성능과 보안 향상을 위해 새 기능(압축, 멀티플렉싱, 우선순위 지정)을 추가

### Https

- 앞서 언급한 http의 보안 문제를 해결
- 클라이언트와 서버가 먼저 암호화 통신 채널을 설정한 다음 평문 HTTP메시지를 전송함으로써 정보 유출을 막음

- 암호화 채널은 이전에 SSL[^1]이라 불렸던 TLS[^2]프로토콜을 사용해서 생성

- https를 사용하는 이유

  - 기밀성[^3]

    :  HTTPS는 인터넷과 같은 공공 매체에서 두 참여자 간의 통신을 보호

  - 무결성[^4]

    : HTTPS는 변조되지 않은 정보로 목적지에 도달하게 함

  - 인증[^5]

    : HTTPS를 통해 웹사이트의 진위 여부를 확인할 수 있음

### SSL&TLS

- SSL 3.0 => TLS 1.0
- SSL은 넷스케이프가 개발한 프로토콜
- TLS는 IETF 표준
- 현재 SSL(1.0, 2.0, 3.0)의 모든 버전은 여러 가지 보안 문제로 사용되지 않고 대부분의 브라우저에서 경고를 표시
- 현재 TLS 버전(1.0, 1.1, 1.2)을 사용하고 있으며 1.3 버전은 초안
- 현재 대부분의 웹사이트가 이 버전에서 운영되고 있다. HTTP는 민감하지 않은 트래픽(예: 뉴스 기사)에 이용되고 HTTPS는 민감한 트래픽(예: 인증, 전자상거래)에 이용
- 프라이버시에 관심이 높아지면서 구글 크롬과 같은 웹 브라우저는 이제 HTTP 웹사이트를 ‘안전하지 않음’으로 표시하고 HTTP의 앞날에 경고를 보냄.



## HTTPS 인증서 유형

### 신원 검증 방법에 따른 분류

#### DV(Domain Validated)

- 도메인이 특정 공개 키와 일치하는지 확인

- 브라우저에서는 법적 신원을 보여주지는 않음
- 비용 : 무료 or 저렴(10달러/년)

#### EV(Extenteded Validation)

- 웹사이트의 법적 신분을 검증
- 증 기관에서 도메인을 관리하는 이의 법적 신원을 확인한 후 얻을 수 있음
- 법적 신원이 확인 되는 방법
  - 도메인 관리(예: DV 인증서)
  - 회사가 등록되었고 현재 유지 상태인지 확인할 수 있는 공인된 사업 기록
  - D&B(Dunn and Bradstreet), 세일즈포스 connect.data.com, 전화번호부 등에 등재된 자영업 정보
  - 확인 전화
- 닫힌 자물쇠 표시뿐만 아니라 EV HTTPS 인증서는 URL 앞에 검증된 법적 신원의 이름(등록된 회사)을 표시. 해당 표시를 클릭하면 이름과 주소 같은 조직에 대한 자세한 정보를 보여줌
- 비용 : 150~300달러/년

#### OV(Organization validated)

- 웹사이트의 법적 신분을 검증
-  EV 인증서와 달리 UI에서 확인된 법적 이름을 표시하지는 않음.
- 비용 : 40~100달러/년

### 다루는 도메인 수에 따른 분류

#### 단일도메인

- `example.com`과 `www.example.com와 같은` 도메인 이름에 유효

#### 다중 도메인(UCC/SAN)

- UCC또는 SAN 인증서로 알려진 인증서 유형으로 지정된 제한까지 도메인의 목록을 다룰 수 있음
- 다른 도메인과 하위 도메인을 혼합할 수 있다. 
- `mail.example.com`, `example.net`, `example.org` 등. 사전 정의된 목록, 지정된 최대 제한까지 (보통100)

#### 와일드카드

- `*.example.com`는 `example.com`의 모든 하위 도메인을 뜻한다



## Https 구성요소

1. **초기 키 교환** 
   - 비대칭(개인 키와 공개 키) 알고리즘
2. **신원 인증서(인증 기관에서 발행한 HTTPS 인증서)**
   - 비대칭(개인 키와 공개 키) 알고리즘을 사용
3. **실제 메시지 암호화** 
   - 대칭(미리 공유한 시크릿) 알고리즘을 사용
4. **메시지 다이제스트**
   - 암호 해싱 알고리즘을 사용

=> 공개 키(키 교환) 1개 + 대칭 키(암호) 1개 + 메시지 다이제스트(해싱) 알고리즘1개

예시) `ECDHE-RSA-AES256-GCM-SHA384`

`ECDHE`: ECDHE[^6] 키 교환 알고리즘을 사용해 교환

`RSA`: 인증 기관은 RSA[^7]알고리즘을 사용해 인증서를 서명

`AES256-GCM`: 대칭 메시지 암호화는 256비트 키와 GCM 운영 모드를 갖는 AES[^8]암호를 사용

`SHA384`: 메시지 무결성은 384비트 다이제스트를 사용하는 SHA 보안 해싱 알고리즘을 사용해 검증



## 키 유형

### ECC[^9]

- RSA 인증서보다 더 빠르고 CPU를 덜사용(모바일에서 중요)
- 아마존 Cloud Front나 Heroku같은 일부 서비스는 지원X
- 256bit ECC 키면 충분

### RSA[^7]

- 더 느리지만 오래된 다양한 서버와 호환
- RSA 키는 ECC보다 커서 최소 2048bit
-  4096비트 이상의 RSA 키는 성능에 좋지 않음



## Https 인증서를 얻는 단계

1. 개인 키와 공개 키 쌍을 만들고 조직과 공개 키에 관한 정보를 포함하는 CSR[^10]을 준비
2. 인증 기관에 연결해 CSR 기반 HTTPS 인증서를 요청
3. 서명된 HTTPS 인증서를 획득하고 웹 서버에 인증서를 설치



## Https 인증서 얻기 (우분투 위주) 

### 아래 예시의 파일 이름 설명

***다음 예시의 파일 이름 및 확장자는 표준이 아님( =원하는 어떤 것도 가능)**

`example.com.key`

- PEM 형식 파일, 개인 키를 포함
- 확장자 `.key`는 표준이 아니므로 일부에서는 사용
- 시스템 슈퍼 유저만이 보호하고 접근할 수 있음

`example.com.pub`

- PEM 형식 파일, 공개 키를 포함
- 이 파일은 개인 키에서 생성될 수 있기 때문에 실제로는 필요하지 않음

`example.com.csr`

- 인증서 서명 요청
- 조직 정보와 서버의 공개 키를 포함하는 PEM 형식 파일을 HTTPS 인증서를 발행하는 인증 기관에 보내야함

`example.com.crt`

- HTTPS 인증서는 인증 기관이 서명한 것
- PEM 형식 파일
- 서버의 공개 키와 조직 정보, 인증 기관 서명, 유효기간, 만료 날짜 등을 포함
-  `.crt`는 표준이 아님. 다른 일반적인 확장자는 `.cert`와 `.cer`을 포함

### 1단계: 개인 키와 CSR만들기

1. OpenSSL이 설치되었는지 다음 명령을 사용해 확인한다.

   ```
   openssl version
   ```

2. OpenSSL이 설치되어있지 않다면 설치를 진행한다.

   ```
   sudo apt-get install openssl
   ```

3. 개인 키와 CSR을 생성한다.

   ```
   openssl req -newkey rsa:2048 -nodes -keyout example.com.key -out example.com.csr
   ```

4. 개인 키가 생성되고 CSR에 대한 몇 가지 질문을 요청받는다.

   ```
   Generating a 2048 bit RSA private key
   ……………………+++
   ……………………………………………………….+++
   writing new private key to ‘example.com.key’
   —–
   You are about to be asked to enter information that will be incorporated
   into your certificate request.
   What you are about to enter is what is called a Distinguished Name or a DN.
   There are quite a few fields but you can leave some blank
   For some fields there will be a default value,
   If you enter ‘.’, the field will be left blank.
   
   Country Name (2 letter code) [AU]:GB
   State or Province Name (full name) [Some-State]:London
   Locality Name (eg, city) []:London
   Organization Name (eg, company) [Internet Widgits Pty Ltd]:ACME Inc.
   Organizational Unit Name (eg, section) []:IT
   Common Name (e.g. server FQDN or YOUR name) []:example.com
   Email Address []:admin@example.com
   
   Please enter the following ‘extra’ attributes
   to be sent with your certificate request
   A challenge password []:
   An optional company name []:
   ```

   *서명된 인증서에 공개되므로 모든 질문에 알맞은 답을 제공해야한다.

   *HTTPS 인증서를 요청하는 도메인 이름과 정확히 일치해야 하는 ‘Common Name’ 섹션에 특별히 주의

   *상위 수준 도메인만(`example.com`) 포함

### 2단계: HTTPS 인증서 얻기

#### 업체 인증서 

1. HTTPS 인증서 공급 업체를 찾는다.
2. 인증서 유형(DV, OV, EV, 단일 사이트, 멀티 사이트, 와일드 카드)을 선택하고 ‘Add to cart’를 클릭한다. 선호하는 지급 방법을 지정하고 지불을 완료한다.
3. 도메인에 새로운 HTTPS 인증서를 활성화한다. 인증서 서명 요청을 붙여 넣거나 업로드할 수 있다. 시스템은 CSR에서 인증서 세부 사항을 뽑아낸다.
4. ‘Domain Control Validation’이라는 방식을 선택하라는 요청을 받는다. 이메일이나 HTML 파일(HTTP 기반) 업로드, 도메인 영역 파일(DNS 기반)에 `TXT` 레코드를 추가를 통해 수행한다.
5. 검증이 완료되고 HTTPS 인증서가 발행될 때까지 잠깐 기다린다. 서명된 HTTPS 인증서를 다운로드한다.

#### 자체 서명 인증서

- 인증 기관을 통하지 않고 스스로 인증서를 서명할 수도 있다.

- 다른 인증서만큼이나 암호화 방법으로 우수하기 때문에 테스트 목적으로는 좋으나, 브라우저에서는 신뢰하지 않으므로 보안 경고를 표시한다.

- OpenSSL을 사용할 수 있는 모든 플랫폼에서 자체 서명 인증서를 만들 수 있다.

  ```
  openssl x509 -signkey example.com.key -in example.com.csr -req -days 365 -out example.com.crt
  ```

### 3단계: 웹사이트에 HTTPS 인증서 설치하기

#### NGINX

1. nginx 구성 파일을 편집한다(`nginx.conf`) => 파일 경로 (/etc/nginx/nginx.conf)

   *이 구성은 [Mozilla SSL Configuration Generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/)을 이용해 생성

   *이 생성기는 자동으로 HTTP에서 HTTPS로 리디렉션을 처리하기 위한 코드를 생성하며, 기본으로 HTTP/2를 활성화한다.

   ```
   server {
   
   listen 80 default_server;
   
   listen [::]:80 default_server;
   
    
   
   # 301 Moved Permanently 응답과 함께 모든 HTTP 요청을 HTTPS로 리디렉션한다.
   
   return 301 https://$host$request_uri;
   
   }
   
    
   
   server {
   
   listen 443 ssl http2;
   
   listen [::]:443 ssl http2;
   
    
   
   # SERVER HELLO에서 클라이언트에 보낸 인증서는 ssl_certificate에서 연결된다.
   
   ssl_certificate /path/to/signed_cert_plus_intermediates;
   
   ssl_certificate_key /path/to/private_key;
   
   ssl_session_timeout 1d;
   
   ssl_session_cache shared:SSL:50m;
   
   ssl_session_tickets off;
   
    
   
   # DHE ciphersuites용 Diffie-Hellman 매개변수는 2048 비트 권장
   
   ssl_dhparam /path/to/dhparam.pem;
   
    
   
   # 중간 구성. 필요에 따라 조정
   
   ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
   
   ssl_ciphers ‘ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS’;
   
   ssl_prefer_server_ciphers on;
   
    
   
       # HSTS (ngx_http_headers_module 필수) (15768000초 = 6개월)
   
   add_header Strict-Transport-Security max-age=15768000;
   
    
   
   # OCSP Stapling —
   
   # ssl_certificate의 URL에서 OCSP 레코드를 불러와 캐시에 저장한다.
   
   ssl_stapling on;
   
   ssl_stapling_verify on;
   
    
   
   ## 루트 CA 와 중간 인증 기관을 사용해 OCSP 응답의 신뢰 사슬을 검증한다.
   
   ssl_trusted_certificate /path/to/root_CA_cert_plus_intermediates;
   
   resolver <IP DNS resolver>;
   
   
   ….
   ```

## 서버 테스트

- 서버를 구성하고 웹사이트를 HTTPS에서 실행한 후 [Qualys SSL Server Test](https://www.ssllabs.com/ssltest/)를 사용해 보안 구성을 확인하는 것이 좋다.
- 이 테스트를 수행하면 웹사이트를 스캔하고 구성에 대한 포괄적인 평가와 취약점, 권장 설정을 알려준다. 

## 갱신

- 인증서는 지정한 기간 동안 유효하다(보통 1년 정도)
- 등록 기관에서는 갱신 날짜가 다가오면 메일을 보내기 시작하는데, 첫 번째 알림을 받자마자 새로운 인증서를 발행하는게 좋다.
- 인증서의 유효성은 서명 시점에 시작되고 만료일은 현재 인증서가 만료된 후 1년으로 설정된다.
- 겹치는 기간 동안 이전 인증서 만료 전에도 새로운 인증서는 정상 동작하기 때문에 웹사이트 서비스는 중단되지 않는다.

## 폐기

- 서버가 손상됐거나 누군가가 개인 키에 액세스할 수 있다고 생각되면 즉시 현재 HTTPS 인증서를 폐기해야 한다.
- 일반적으로 등록 기관의 특수한 데이터베이스에서 손상된 인증서를 비활성으로 표시한 다음 새로운 HTTPS 인증서를 발행한다.



# 참고

- https://webactually.com/2018/11/16/http%EC%97%90%EC%84%9C-https%EB%A1%9C-%EC%A0%84%ED%99%98%ED%95%98%EA%B8%B0-%EC%9C%84%ED%95%9C-%EC%99%84%EB%B2%BD-%EA%B0%80%EC%9D%B4%EB%93%9C/



# 각주

[^1]: Secure Socket Layer
[^2]: Transport Layer Security
[^3]: 인증되지 않은 제3자가 정보를 읽지 못하도록 보호하는 것
[^4]: 전체 정보가 잘 도착했으며, 전송 중에 누가 변조하지 않았음을 보장하는 것
[^5]: 상대편의 신원을 보증하기 위해 상호 신뢰할 수 있는 제3자 (인증 기관)
[^6]: Elliptic Curve Diffie-Hellman Ephemeral
[^7]: Rivest-Shamir-Adleman
[^8]: Advanced Encryption Standard
[^9]: Elliptic Curve Cryptography
[^10]: Certificate Signing Request