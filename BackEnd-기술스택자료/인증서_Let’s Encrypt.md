# [Let’s Encrypt](https://letsencrypt.org/)

Let’s Encrypt는 무료이며 자동화된 공개 인증 기관이다. 공공의 이익을 위해 운영된다. Let’s Encrypt는 [Internet Security Research Group(ISRG)](https://letsencrypt.org/isrg/)에서 제공하는 서비스다.

Let’s Encrypt의 핵심 원칙

- **무료** 

  도메인 이름을 소유한 누구나 Let’s Encrypt를 사용해 무료로 신뢰된 인증서를 얻을 수 있다.

- **자동** 

  웹 서버에서 실행 중인 소프트웨어는 Let’s Encrypt와 상호작용해 어려움 없이 인증서를 사용할 수 있도록 안전하게 구성할 수 있으며 자동으로 갱신한다.

- **보안**

  Let’s Encrypt는 CA와 웹사이트 운영자 모두 서버를 안전하게 운영하도록 도움으로써 보안 TLS 보안 모범 사례를 제공하는 플랫폼 역할을 한다.

- **투명** 

  발행되고 폐기된 모든 인증서는 기록이 공개되어 누구나 확인할 수 있다.

- **공개** 

  다른 곳에서도 적용할 수 있도록 자동 발행과 갱신 프로토콜을 공개 표준으로 게시한다.

- **공공성** 

  기본 인터넷 프로토콜처럼 Let’s Encrypt는 공동체 이익을 위한 공동 노력의 산물로 어떤 조직도 통제하지 못한다.

## 기존 동작 방식과의 차이점

- **무료** 

  Let’s Encrypt HTTPS의 인증서는 웹사이트 전체 수명 동안 완전히 무료다.

- **자동** 

  Let’s Encrypt HTTPS 인증서는 1년의 유효기간을 갖는 보통의 HTTPS 인증서와 달리 [유효기간이 90일](https://letsencrypt.org/2015/11/09/why-90-days.html)이다. 인증서 갱신 자동화를 권장한다. 

  예를 들어, 서버 관리자는 전용 소프트웨어 서비스를 설정(또는 cron에서 소프트웨어를 주기적으로 호출)해 모든 호스팅 도메인에 초기 도메인 검증과 후속 갱신을 관리한다. 한 번 설정하고 잊어버리는 스타일을 추구하는 것이다.

- **보안** 

  Let’s Encrypt HTTPS 인증서는 보안을 약화시키지 않고 발행되므로 오래되고 이질적인 플랫폼과 호환성에 문제를 야기한다. [호환성 페이지](https://letsencrypt.org/docs/certificate-compatibility/)를 검토해 호환되지 않는 플랫폼을 제외했는지 확인하자.

## **한계**

- Let’s Encrypt는 DV 인증서만 제공한다. 
- OV와 EV는 지원하지 않으며 앞으로도 지원 계획은 없다. 
- 단일 도메인이나 멀티 도메인 HTTPS 인증서는 제공하지만 와일드카드 인증서는 제공하지 않는다. 
- 더 자세한 정보는 [Let’s Encrypt FAQ](https://letsencrypt.org/docs/faq/)에서 확인할 수 있다.

## Let’s Encrypt HTTPS 인증서 사용하기(우분투+Nginx)

서버에 Let’s Encrypt를 설정하는 가장 쉬운 방법이 [Certbot](https://certbot.eff.org/)을 사용하는 것이다. 웹 서버와 운영체제를 선택하고 다음 지시만 따르면 된다.

**구성하려는 폴더 구조(폴더 구조는 자유)**

<img src="https://user-images.githubusercontent.com/69910544/105384921-1db0c900-5c56-11eb-9467-016859511396.png" alt="image" style="zoom:50%;" />

- plover: 프로젝트 폴더

- Dockerfile: docker설정 파일

- build

  - static: 빌드한 static파일(프론트엔드)

- dev

  - jar: 빌드한 jar파일(백엔드)

- docker-compose.yml: docker에서 서버에 올릴 이미지들 모음

  ```sh
  #docker-compose.yml의 nginx이미지 부분
  nginx:
  	image : nginx:1.18.0
  	ports:
  		- 80:80
  		- 443:443
  	volumes:
  	# 도커의 etc/nginx/nginx.conf에 로컬의 ./nginx/nginx.conf파일을 올림
  	- ./nginx/nginx.conf:/etc/nginx/nginx.conf
  	
  	# 도커의 /etc/nginx/conf.d에 로컬의 ./proxy파일을 올림
  	# nginx의 reverse proxy관련 파일인 proxy.conf가 있음
  	- ./proxy:/etc/nginx/conf.d
  	
  	# 도커의 /etc/letsencrypt에 로컬의 /etc/letsencrypt파일을 올림
  	# letsencrypt 인증서와 관련된 파일 폴더
     	# /etc/etc/letsencrypt/live/{도메인명}폴더에 인증서관련 파일 4개가 저장
  	- /etc/letsencrypt:/etc/letsencrypt
  	
  	# 도커의 /var/www/letsencrypt에 로컬의 /var/www/letsencrypt파일을 올림
  	- /var/www/letsencrypt:/var/www/letsencrypt
  	
  	# 도커의 /var/www/html에 로컬의 ./build파일을 올림
  	- ./build:/var/www/html
  ```

- nginx

  - nginx.conf: nginx 설정 파일

- proxy

  - proxy,conf: nginx의 reverse proxy서버 설정 파일

### Let’s Encrypt SSL 인증서 발급 방법 4가지

1. webroot 

   : 사이트 디렉토리 내에 인증서 유효성을 확인할 수 있는 파일을 업로드하여 인증서를 발급하는 방법

   - 실제 작동하고 있는 웹서버의 특정 데렉토리의 특정 파일 쓰기 작업을 통해서 인증
   - 이 방식의 장점은 nginx를 중단시킬 필요가 없음.
   - 이 방법의 단점은 인증 명령에 하나의 도메인 인증서만 발급 가능

2. 웹서버

   - Nginx나  아파치와 같은 웹서버에서 직접 SSL 인증을 실시하고 웹서버에 맞는 SSL세팅값을 부여
   - 발급이나 갱신을 위해 웹서버를 중단시킬 필요가 없음
   - 인증서 갱신 시 상황에 맞게 세팅을 자동으로 업데이트
   - 사용자가 세팅을 변경할 수 있지만 자동 업데이트 시 반영되지는 않음

3. Standalone

    : 사이트 작동을 멈추고 이 사이트의 네크워킹을 이용해 사이트 유효성을 확인해 Let’s Encrypt SSL 인증서를 발급하는 방식

   - 80포트로 가상 staandalone 웹서버를 띄워 인증서를 발급
   - 이 방식은 동시에 여러 도메인을 발급 받을 수 있음
   - 그렇지만 인증서 발급 전에 Nginx를 중단하고 발급 완료 후 다시 Nginx를 시작해야 함

4. DNS

   : 도메인을 쿼리해 확인되는 TXT 레코드로 사이트 유효성을 확인하는 방법

   - 와일드 카드 방식으로 인증서를 발급 가능

   - 이 방법은 당연하게도 서버 관리자가 도메인 DNS를 관리/수정할 수 있어야 하며

   - 인증서 갱신 시마다 DNS에서 TXT값을 변경해야 하므로

     외부에서 TXT 레코드를 입력할 수 있도록 DNS가 API를 제공하는 경우만 갱신 과정을 자동으로 처리([클라우두플레어 API](http://blog.minase.moe/2)가 대표적인 사례)

#### 0. certbot설치

[Certbot](https://certbot.eff.org/)에서 환경을 선택하면 설치를 안내해준다.

우분투의 경우

1. snap설치(우분투 16.04.4, 18.04, 20.04경우 기본으로 설치되어있음.)

   다른 버전은 https://snapcraft.io/docs/installing-snapd 참고

2. 기존에 설치된 Certbot 패키지가 있다면 삭제

   ```shell
   apt remove certbot
   ```

3. certbot설치

   ```shell
   snap install --classic certbot
   ```

4. certbot 커맨드 준비

   ```shell
   ln -s /snap/bin/certbot /usr/bin/certbot
   ```

5. 인증서를 설치하거나 인증서발급받기 (필요할 때 실행)

   - 인증서 설치(입력 후 도메인, 이메일 등 설정하기)

     ```shell
     certbot --nginx
     ```

   - 인증서 발급만 하기

     ```shell
     certbot certonly --nginx
     ```

#### 1. webroot으로 SSL 인증서 발급

1. 서버 내에 .well-known이 있는 곳을 지정후 생성 

   ```shell
   mkdir -p /var/www/letsencrypt/.well-known/acme-challenge
   ```

2. 특정 폴더(여기에선 /etc/nginx/snippets)에서 letsencrypt.conf파일을 만듬

   ```shell
   touch /etc/nginx/snippets/letsencrypt.conf 
   ```

3. 해당 파일에 아래와 같은 내용을 추가합니다.

   ```
   # letsencrypt.conf 
   
   # conf파일 편집
   vim letsencrypt.conf
   # 아래의 내용 추가
   location ^~ /.well-known/acme-challenge/ {
   default_type "text/plain";
   root /var/www/letsencrypt;
   }
   ```

4. reverse proxy server 설정 파일에 letsencrypt.conf 참조

   ```shell
   server {
       listen 80
       # 도메인 : dev.plover.co.kr
       server_name dev,plover.co.kr
   
   	# docker-compose을 사용한다면
   	# docker-compose.yml의 nginx volumn에 해당 구문 추가
   	# /etc/nginx/snippets:/etc/nginx/ssl/
       include /etc/nginx/ssl/letsencrypt.conf;
       
       # Nginx만 사용한다면 이 주소를 임포트 해오는 것을 추천
       include /etc/nginx/snippets/letsencrypt.conf;
   
       location / {
           return 301 https://$host$request_uri;
           # return 301 아래에 expires epoch; 을 붙여주는 것은 301 리다이렉트가 캐싱되지 않도록 하기 위함
           expires epoch;
       }
   }
   ```

5.  Nginx실행

   ```shell
   #Nginx 실행
   service nginx restart
   
   #docker-compose실행
   docker-compose up
   ```

6. SSL 인증서 발급

   ```shell
   certbot certonly --webroot --webroot-path=/var/www/letsencrypt -d 도메인명
   ```

   *webroot-path는 well-known폴더가 있는 곳을 가리킴

   

#### 2. 웹서버를 통한 SSL 인증서 발급

1.  웹서버용 인증서 설치 툴인 Certbot을 설치(nginx용) (0단계에서 설치했다면 패스)

2.  0-5번 명령어를 통해서 인증서를 설치한다.

   => 알아서 `/etc/letsencrypt` 폴더에 들어간다

   *자동 갱신은 하단에 [인증서 자동 갱신하기](#인증서 자동 갱신하기) 참고

3. 다른 파일에 인증서관련 내용추가

   - docker-compose.yml 

     ```shell
     # docker-compose.yml
     ...
     services:
       nginx:
         image: nginx:1.18-alpine
         ports:
           - "80:80"
           - "443:443"
         volumes:
           - ./data/nginx.conf:/etc/nginx/nginx.conf
           - ./data/nginx:/etc/nginx/conf.d
           
           ##### 인증서 관련 추가 사항 #####
           ## 폴더 구성에 따라 변경 가능
           - /etc/letsencrypt:/etc/letsencrypt
           - /var/www/letsencrypt:/var/www/letsencrypt
         ## 6시간마다 nginx를 reload하는 쉘 스크립트 (조정가능)
         command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \"daemon off;\"'"
           #############################
       
       #인증서 발급을 위한 certbot추가
       certbot:
         image: certbot/certbot
         volumes:
           ## 폴더 구성에 따라 변경 가능
           - /etc/letsencrypt:/etc/letsencrypt
           - /var/www/letsencrypt:/var/www/certbot
         ## 12시간마다 인증서를 재발급 받는 쉘 스크립트 (조정가능)
         entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
     ```

   - proxy.conf

     ```shell
     # proxy.conf
     
     server {
         listen 80;
     	# 아이피로 http 접속하는 것을 막음
         server_name 54.180.105.93;
     
         location / {
             return 301 https://dev.plover.co.kr$request_uri;
         }
     }
     
     # http로 접속했을 때
     server {
     	# 서버 포트를 80번으로 오픈
         listen 80;
         # 설정할 도메인(IP) 지정
         server_name dev.plover.co.kr;
         
         # 디폴트 경로
         location / {
         	# http로 접속하면 https로 변경
             return 301 https://$host$request_uri;
         }
         # certbot관련
         location /.well-known/acme-challenge/ {
              root /var/www/certbot;
         }
         access_log /var/log/nginx/access.log;
         error_log /var/log/nginx/error.log;
     }
     
     # https로 접속했을 때
     server {
         listen 443 ssl;
         server_name dev.plover.co.kr;
     	
     	#루트 경로로 접속했을 때 보여줄 파일
     	root /var/www/html;
         index index.php index.html index.htm index.nginx-debian.html;
     
         access_log /var/log/nginx/access.log;
         error_log /var/log/nginx/error.log;
     
     	#추가 옵션
         #proxy_connect_timeout 1d;
         #proxy_send_timeout 1d;
         #proxy_read_timeout 1d;
     
     	#디폴트 경로
         location / {
             try_files $uri $uri/ /index.html;
             proxy_redirect     off;
         }
         #/ssafy 경로
         location /ssafy {
         	## ssafy이후 경로를 $1로 구성
             rewrite /ssafy/(.*) /ssafy/$1 break;
             proxy_pass http://spring:8080;
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header Host $http_host;
         }
     
         # nginx에서 HTTPS프로토콜에 이용될 ssl인증서 경로
         ssl on;
         ssl_certificate /etc/letsencrypt/live/dev.plover.co.kr/fullchain.pem;
         ssl_certificate_key /etc/letsencrypt/live/dev.plover.co.kr/privkey.pem;
         
         #SSL테스트에서 A등급을 받기위함
         include /etc/letsencrypt/options-ssl-nginx.conf;
         ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
     }
     ```

     *** [SSL테스트 가능 페이지](https://www.ssllabs.com/index.html)**

#### 3. standalone 옵션 적용 SSL 인증서 발급

1. SSL 인증을 위한 Certbot tool을 설치(0단계에서 설치했다면 패스)

   ```shell
   sudo apt update
   sudo apt-get install letsencrypt -y
   ```

2. (웹서버가 실행 중이라면) 웹서버를 중단

   ```shell
   cd /root/
   service nginx stop
   ```

3. certbot 명령을 이용해 SSL 인증을 시작

   - -d 옵션 : 도메인 이름만으로 인증이 진행

   ```shell
   certbot certonly --standalone -d 사이트명( 사이트명2 사이트명3 ...)
   ```

4. 인증이 완료되면 웹서버를 가동한다.

   ##### *여러개 도메인을 한번에 인증받기가능 단, 나중에 사이트를 없앨 때 난감할 수 있음

   

#### 4. DNS 이용해 발급 받기(생략)

- [Let’s Encrypt SSL 인증서 발급 방법](https://happist.com/573990/%EC%B5%9C%EC%8B%A0-lets-encrypt-ssl-%EC%9D%B8%EC%A6%9D%EC%84%9C-%EB%B0%9C%EA%B8%89-%EB%B0%A9%EB%B2%95-3%EA%B0%80%EC%A7%80-%EC%A0%95%EB%A6%AC) 참고

  

## 인증서 자동 갱신하기

* 인증서 갱신 명령어

```shell
$ certbot-auto renew
```

=> 매번 실행하기엔 불편하다

- crontab을 이용해 자동으로 갱신하도록 설정

  1. 크롭탭 열기

     ```shell
     $ sudo crontab -e
     ```

  2. 텍스트 에디터에 스케줄을 적어 줌.

     ```shell
     # ubuntu 16.04
     15 3 * * * certbot-auto renew && /etc/init.d/nginx reload
     
     # ubuntu 18.04
     15 3 * * * certbot-auto renew --quiet --renew-hook "/etc/init.d/nginx reload"
     
     30 2 1 1-12 * /usr/bin/letsencrypt renew >> /var/log/le-renew.log 
     35 2 1 1-12 * /bin/systemctl reload nginx
     # 매월 1일 새벽 2시 30분에 인증서가 갱신되며
     # 매월 1일 새벽 2시 35분에 nginx를 재실행 합니다.
     ```

     * 앞의 5가지 항목은 분, 시, 일, 월, 요일 입니다.
       자세한 설명은 [cron,_crond,_crontab](https://zetawiki.com/wiki/리눅스_반복_예약작업_cron,_crond,_crontab)를 참고

# 참고

- [HTTP에서 HTTPS로 전환하기 위한 완벽 가이드](https://webactually.com/2018/11/16/http%EC%97%90%EC%84%9C-https%EB%A1%9C-%EC%A0%84%ED%99%98%ED%95%98%EA%B8%B0-%EC%9C%84%ED%95%9C-%EC%99%84%EB%B2%BD-%EA%B0%80%EC%9D%B4%EB%93%9C/)
- [Let’s Encrypt SSL 인증서 발급 방법](https://happist.com/573990/%EC%B5%9C%EC%8B%A0-lets-encrypt-ssl-%EC%9D%B8%EC%A6%9D%EC%84%9C-%EB%B0%9C%EA%B8%89-%EB%B0%A9%EB%B2%95-3%EA%B0%80%EC%A7%80-%EC%A0%95%EB%A6%AC)
- [Nginx로 Reverse-proxy 서버 구성 +SSL인증서 (Docker로 구성)](https://www.lostcatbox.com/2020/08/12/nginx-proxy/#Nginx로-프록시서버-만들기)

# 참고하면 좋은 사이트

- [Nginx 튜토리얼](https://opentutorials.org/module/384/3462)