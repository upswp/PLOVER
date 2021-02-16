export default class Event {
    constructor($target) {
        this.$target = $target;

        //이벤트 등록
        this.addEvent($target);
    }

    //이벤트 위임기법을 사용한 이벤트 핸들링
    addEvent($target) {
        $target.addEventListener('click', this.eventHandler.bind(this));
    }

    eventHandler(e) {
        console.log(e.target);
    }

    attachPhotoEventHandler(e) {

    }

    destroy() {
        window.removeEventListener('click', this.eventHandler.bind(this));
    }
}