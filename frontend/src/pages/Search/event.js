import axios from 'axios'

export default class Event {
  constructor($history) {
    this.$history = $history
  }

  setKeyword($keyword) {
    this.$keyword = $keyword
  }

  addEvent() {
    this.keydownHandler = this.keydownEventHandler.bind(this)

    this.$keyword.addEventListener('keydown', this.keydownHandler)
  }

  keydownHandler(e) {
    if (e.keyCode == 13) {
      this.search()
    }
  }

  async search() {
    if (this.$keyword.value <= 0) {
      console.log('default')
      return
    }
    await axios.get('https://dev.plover.co.kr/ssafy/study/search/0', {
      params: {
        keyword: this.$keyword.value
      }})
      .then((res) => {
        if (res.status === 200) {
          console.log(this.$keyword.value)
          console.log(res)
          if (res.data.response === "success") {
            
          }
        }
      })
  }
}