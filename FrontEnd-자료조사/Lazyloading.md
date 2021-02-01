#### getBoundingClientReact

- elem.getBoundingClientRect() 메서드는 DOMRect 객체를 반환합니다.
- DOMRect 객체는 elem을 감쌀 수 있는 가장 작은 네모 영역의 window 기준 좌표를 저장하고 있는 객체입니다.
- DOMRect - top/left(네모영역의 top,left좌표), width/height(네모영역의 너비/높이), 

#### lazy loading이란 ?

- lazy loading은 이미지 로딩을 뒤로 미루는 것을 말한다.(이미지말고도 리소스를 뒤로 미루는 것)
- 웹페이지를 열어 스크롤을 밑으로 내리지않으면 밑의 영역은 보이지 않는다.
- 보이지 않는 영역에 표시되는 이미지는 뒤로 미루고 스크롤을 내려 보이는 순간부터 이미지를 로딩하여 표시하는 기법이다.
- 사용자의 데이터 낭비를 최소화 할 수 있다.

#### lazy loading 방법 1 (getBoundingClientReact 메서드를 활용)
```javascript
<div style="display:flex;flex-direction: column;">
    <img data-lazy="https://cdn.pixabay.com/photo/2021/01/21/14/10/egret-5937499_960_720.jpg" width="300"
        height="300" />
    <img data-lazy="https://cdn.pixabay.com/photo/2020/10/02/13/38/sea-5621150_960_720.jpg" width="300" height="300" />
    <img data-lazy="https://cdn.pixabay.com/photo/2021/01/07/15/02/york-minster-5897525_960_720.jpg" width="300"
        height="300" />
    <img data-lazy="https://cdn.pixabay.com/photo/2021/01/22/16/55/camera-5940588_960_720.jpg" width="300"
        height="300" />
    <img data-lazy="https://cdn.pixabay.com/photo/2021/01/13/13/46/house-5914171_960_720.jpg" width="300"
        height="300" />
    <img data-lazy="https://cdn.pixabay.com/photo/2020/09/16/04/11/sunset-5575264_960_720.jpg" width="300"
        height="300" />
</div>
<script>
    let images = document.querySelectorAll('img');

    window.addEventListener('scroll', (e) => {
        images.forEach((img) => {
            let rect = img.getBoundingClientRect().top; //윈도우 창크기에서의 rect의 top위치
            if (rect <= window.innerHeight) {//top위치가 innerHeight보다 작아진다면 즉 top이 보이기 시작한다면
                setTimeout(() => {
                    img.setAttribute('src', img.dataset.lazy);
                }, 1000);
            }
        });
    });
</script>
```
> 해당 lazy loading방식의 문제점은 이미지가 로딩되었음에도 계속 핸들러가 의미없이 동작한다는 것이다.
> 또한 처음 웹페이지 접속시 스크롤을 하지않으면 화면에 이미지가 로딩되지 않는 점도 있다.

#### lazy loading 방법 2 (IntersectionObserver API 활용 - 좋은방법)

- IntersectionObserver API는 기본적으로 브라우저 뷰포트와 설정한 요소의 교차점을 관찰하는데 사용됩니다.
- 교차점이란 화면에 보이기 시작하는 부분을 얘기합니다.
- new IntersectionObserver()를 통해 관찰자(observer)를 초기화하고 관찰할 대상을 지정(observe)합니다.
- 생성자는 callback과 option 두개의 인수를 가집니다.
- callback은 entries와 observer 두개의 인수를 갖는데, entries는 관찰대상의 엔트리목록입니다.
- observer는 현재 동작중인 옵저버 인스턴스를 참조합니다.
- entry의 속성중 isIntersecting속성은 교차상태로 들어오는지(true) 나가는지(false)를 반환합니다.

```javascript
<div style="display:flex;flex-direction: column;">
    <img data-lazy="https://cdn.pixabay.com/photo/2021/01/21/14/10/egret-5937499_960_720.jpg" width="300"
        height="300" />
    <img data-lazy="https://cdn.pixabay.com/photo/2020/10/02/13/38/sea-5621150_960_720.jpg" width="300" height="300" />
    <img data-lazy="https://cdn.pixabay.com/photo/2021/01/07/15/02/york-minster-5897525_960_720.jpg" width="300"
        height="300" />
    <img data-lazy="https://cdn.pixabay.com/photo/2021/01/22/16/55/camera-5940588_960_720.jpg" width="300"
        height="300" />
    <img data-lazy="https://cdn.pixabay.com/photo/2021/01/13/13/46/house-5914171_960_720.jpg" width="300"
        height="300" />
    <img data-lazy="https://cdn.pixabay.com/photo/2020/09/16/04/11/sunset-5575264_960_720.jpg" width="300"
        height="300" />
</div>
<script>
    const io = new IntersectionObserver((entries, observer) => {
        Array.from(entries).forEach((entry) => {
            if (entry.isIntersecting) { //교차상태로 들어온다면
                entry.target.setAttribute('src', entry.target.dataset.lazy);//src속성 갱신
                observer.unobserve(entry.target); //이미 src속성이 갱신된 entry.target은 더이상 관찰할 필요가 없다.
            }
        });
    });

    const images = document.getElementsByTagName('img');
    Array.from(images).forEach((img) => {
        io.observe(img);//이미지 엘리먼트들은 관찰대상에 전부 등록
    });
</script>
```
> 옵저버는 웹페이지 접속시 최초한번 모든 엔트리를 대상으로 한번 실행되므로 방법1에 대한 문제가 해결된다.
> unobserve를 활용하면 의미없는 로직실행을 방지할 수 있다.
