import restapi from "src/api/restapi"

export default class Event {
    constructor() {

    }

    setTarget($target) {
        this.$target = $target;
    }

    setState($state) {
        this.$state = $state;
    }

    async getNotice() {

        console.log("== getNotice ==");
        await restapi.get("/study/notice/0").then((response) => {
            if (response.status == 200) {
                console.log(response);
                this.$state.setNotices(response.data.data.studies);
            } else {
                console.log(response);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    async getStudies() {

        if (this.$state.lastIndex === -1) {
            console.log("게시글 더이상 없음");
            return;
        }

        console.log("== getStudies ==");
        await restapi.get(`/study/article/최신순/${this.$state.lastIndex}`).then((response) => {
            if (response.status == 200) {
                this.$state.setStudies([...this.$state.studies,
                ...response.data.data.studies
                ]);

                if (!response.data.data.hasNext) {
                    this.$state.setLastIndex(-1);
                    return;
                }

                this.$state.setLastIndex(response.data.data.studies[response.data.data.studies.length - 1].id);
            } else {
                console.log(response);
            }
        }).catch((err) => {
            console.log(err);
        });
        /*
        this.$state.setStudies([...this.$state.studies,
        {
            title: "안녕하세요. 랩레슨 멘토링합니다.",
            tags: ["#bewhy", "#가라사대", "#영원히비와", "#씨잼"],
            profileImg: "/images/bewhy.jpg",
            dateTime: "5분전",
        }, {
            title: "연기지도 해드립니다 ~",
            tags: ["#배우지망", "#배우", "#강소라", "#미생"],
            profileImg: "/images/gangsora.png",
            dateTime: "30분전",
        }, {
            title: "바리스타 같이 도전하실 분~",
            tags: ["#바리스타", "#원빈"],
            profileImg: "/images/one.png",
            dateTime: "1시간전",
        }, {
            title: "현역아이돌의 댄스강연 !!",
            tags: ["#있지", "#ITZY", "#아이돌", "#JYP"],
            profileImg: "/images/yeji.png",
            dateTime: "4시간전",
        }
        ])*/
    }

    //이벤트 위임기법을 사용한 이벤트 핸들링
    addEvent() {
        this.clickHandler = this.clickEventHandler.bind(this);
        this.$target.addEventListener('click', this.clickHandler);
        this.getNotice();

        this.addObserver();
    }

    addObserver() {

        this.$io = new IntersectionObserver((entries, observer) => {
            Array.from(entries).forEach((entry) => {
                if (!entry.isIntersecting) return;

                //console.log(this.$state.lastIndex);

                this.getStudies();

                observer.unobserve(entry.target);
            });
        });

        this.$io.observe(this.$target.querySelector("#footer"));
    }

    clickEventHandler(e) {
        //console.log(e.target);
    };

    attachPhotoEventHandler(e) {

    }

    destroy() {
        console.log("destory");
        this.$target.removeEventListener('click', this.clickHandler);
    }
}