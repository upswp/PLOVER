import restapi from "src/api/restapi"

export default class Event {
    constructor() {

    }

    setTarget($target) {
        this.$target = $target;
    }

    mentoring($value) {
        this.$mentoring = $value;
    }

    lastIndex($value) {
        this.$lastIndex = $value;
    }

    setMentoring($value) {
        this.setMentoring = $value;
    }

    setLastIndex($value) {
        this.setLastIndex = $value;
    }

    async getMentoring() {

        console.log(this.$mentoring);
        if (this.$lastIndex === -1) {
            console.log("게시글 더이상 없음");
            return;
        }

        console.log("== getMentoring ==");
        await restapi.get(`/mentoring/list/${this.$lastIndex}`).then((response) => {
            if (response.status == 200) {
                console.log(response);
                this.setMentoring([...this.$mentoring,
                ...response.data.data.mentoringResponseList
                ]);

                if (!response.data.data.hasNext) {
                    this.setLastIndex(-1);
                    return;
                }

                this.setLastIndex(response.data.data.mentoringResponseList[response.data.data.mentoringResponseList.length - 1].id);
            } else {
                console.log(response);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    //이벤트 위임기법을 사용한 이벤트 핸들링
    addEvent() {
        this.addObserver();
    }

    addObserver() {

        this.$io = new IntersectionObserver((entries, observer) => {
            Array.from(entries).forEach((entry) => {
                if (!entry.isIntersecting) return;

                this.getMentoring();

                observer.unobserve(entry.target);
            });
        });

        this.$io.observe(this.$target.querySelector("#footer"));
    }

    destroy() {
        console.log("destory");
        this.$target.removeEventListener('click', this.clickHandler);
    }
}