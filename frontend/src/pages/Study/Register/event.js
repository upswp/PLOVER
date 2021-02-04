export default class Event {
    constructor($target, $state) {
        this.$target = $target;
        this.$state = $state;
        //이벤트 등록
        this.addEvent();
    }

    //이벤트 위임기법을 사용한 이벤트 핸들링
    addEvent() {
        this.clickHandler = this.clickEventHandler.bind(this);
        this.keyupHandler = this.keyupEventHandler.bind(this);

        this.$target.addEventListener('click', this.clickHandler);
        this.$target.addEventListener('keyup', this.keyupHandler);
    }

    clickEventHandler(e) {
        //console.log(e.target);
    };

    keyupEventHandler(e) {
        if (e.target.id && e.target.id == "input_tag") {
            if (e.target.value.length <= 0) {
                this.$state.setTags([]);
                return;
            };

            let tag_list = e.target.value.trim().split(" ");

            for (let i = 0; i < tag_list.length; i++) {
                tag_list[i] = "#" + tag_list[i];
            }

            if (tag_list.length > 0) this.$state.setTags(tag_list);
        }
        //console.log(e.target);
    }

    attachPhotoEventHandler(e) {

    }

    destroy() {
        console.log("destory");
        this.$target.removeEventListener('click', this.clickHandler);
        this.$target.removeEventListener('keyup', this.keyupHandler);
    }
}