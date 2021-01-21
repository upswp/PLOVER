# [Let’s Encrypt](https://letsencrypt.org/)

Let’s Encrypt는 무료이며 자동화된 공개 인증 기관이다. 공공의 이익을 위해 운영된다. Let’s Encrypt는 [Internet Security Research Group(ISRG)](https://letsencrypt.org/isrg/)에서 제공하는 서비스다.

Let’s Encrypt의 핵심 원칙은 다음과 같다.

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

## Let’s Encrypt HTTPS 인증서 사용하기(리눅스 등)

서버에 Let’s Encrypt를 설정하는 가장 쉬운 방법이 [Certbot](https://certbot.eff.org/)을 사용하는 것이다. 웹 서버와 운영체제를 선택하고 다음 지시만 따르면 된다.

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

### 1. webroot으로 SSL 인증서 발급

### 2. 웹서버를 통한 SSL 인증서 발급

### 3. standalone 옵션 적용 SSL 인증서 발급

1. SSL 인증을 위한 Certbot tool을 설치

   ```shell
   sudo apt update
   sudo apt-get install  letsencrypt -y
   ```

2. (웹서버가 실행 중이라면) 웹서버를 중단

   ```shell
   cd /root/
   service nginx stop
   ```

3. certbot 명령을 이용해 SSL 인증을 시작

   - -d 옵션 : 도메인 이름만으로 인증이 진행

   ```shell
   certbot certonly --standalone -d 사이트명
   ```

   

### 4. DNS 이용해 발급 받기



## 인증서 자동 갱신하기

* 인증서 갱신 명령어

```
$ certbot-auto renew
```

=> 매번 실행하기엔 불편하다

- crontab을 이용해 자동으로 갱신하도록 설정

  1. 크롭탭 열기

     ```
     $ sudo crontab -e
     ```

  2. 텍스트 에디터에 스케줄을 적어 줌.

     ```
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

- https://webactually.com/2018/11/16/http%EC%97%90%EC%84%9C-https%EB%A1%9C-%EC%A0%84%ED%99%98%ED%95%98%EA%B8%B0-%EC%9C%84%ED%95%9C-%EC%99%84%EB%B2%BD-%EA%B0%80%EC%9D%B4%EB%93%9C/

- https://happist.com/573990/%EC%B5%9C%EC%8B%A0-lets-encrypt-ssl-%EC%9D%B8%EC%A6%9D%EC%84%9C-%EB%B0%9C%EA%B8%89-%EB%B0%A9%EB%B2%95-3%EA%B0%80%EC%A7%80-%EC%A0%95%EB%A6%AC