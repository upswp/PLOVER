import restapi from "src/api/restapi"

export default class Event {
    constructor() {

    }

    setTarget($target) {
        this.$target = $target;
    }

    studies($value) {
        this.$studies = $value;
    }

    notices($value) {
        this.$notices = $value;
    }

    lastIndex($value) {
        this.$lastIndex = $value;
    }

    setStudies($value) {
        this.setStudies = $value;
    }

    setNotices($value) {
        this.setNotices = $value;
    }

    setLastIndex($value) {
        this.setLastIndex = $value;
    }

    async getNotice() {

        console.log("== getNotice ==");
        await restapi.get("/study/notice/0").then((response) => {
            if (response.status == 200) {
                console.log(response);
                this.setNotices(response.data.data.studies);
            } else {
                console.log(response);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    async getStudies() {

        console.log(this.$studies);
        if (this.$lastIndex === -1) {
            console.log("게시글 더이상 없음");
            return;
        }

        console.log("== getStudies ==");
        await restapi.get(`/study/article/최신순/${this.$lastIndex}`).then((response) => {
            if (response.status == 200) {
                //console.log(response);
                this.setStudies([...this.$studies,
                ...response.data.data.studies
                ]);

                if (!response.data.data.hasNext) {
                    this.setLastIndex(-1);
                    return;
                }

                this.setLastIndex(response.data.data.studies[response.data.data.studies.length - 1].id);
            } else {
                console.log(response);
            }
        }).catch((err) => {
            console.log(err);
        });
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