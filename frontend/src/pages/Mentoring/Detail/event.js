import restapi from "src/api/restapi";

export default class Event {
    constructor($history) {
        this.$history = $history;
    }

    setTarget($target) {
        this.$target = $target;
    }

    mentoring($value) {
        this.$mentoring = $value;
    }

    setMentoring($value) {
        this.setMentoring = $value;
    }

    setHistory($history) {
        this.$history = $history;
    }

    getIndex() {
        let pathname = this.$history.location.pathname;
        let arr = pathname.split("/");
        return parseInt(arr[arr.length - 1]);
    }

    async getMentoring() {
        console.log("== getMentoring ==");
        let index = this.getIndex();
        await restapi.get(`/mentoring/${index}`).then((response) => {
            if (response.status == 200) {
                this.setMentoring(response.data.data);
            } else {
                console.log(response);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

}