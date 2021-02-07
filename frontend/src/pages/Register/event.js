import axios from 'axios'

export default class Event {
  constructor($history) {
    this.$history = $history
  }

  // setState($state) {
  //   this.$state = $state
  // }

  setTarget($target) {
    this.$target = $target
  }

  setPropic($propic) {
    this.$propic = $propic
  }

  setEmail($email) {
    this.$email = $email
  }
  setDupEmail($dupEmail) {
    this.$dupEmail = $dupEmail
  }

  setPassword($password) {
    this.$password = $password
  }

  setPasswordConfirm($passwordConfirm) {
    this.$passwordConfirm = $passwordConfirm
  }

  setNickname($nickname) {
    this.$nickname = $nickname
  }
  setDupNickname($dupNickname) {
    this.$dupNickname = $dupNickname
  }

  setGeneration($generation) {
    this.$generation = $generation
  }

  setCampus($campus) {
    this.$campus = $campus
  }

  addEvent() {
    this.clickHandler = this.clickEventHandler.bind(this)
    // this.keyupHandler = this.keyupEventHandler.bind(this)

    this.$target.addEventListener('click', this.clickHandler)
    this.$dupEmail.addEventListener('click', this.clickHandler)
    this.$dupNickname.addEventListener('click', this.clickHandler)
    // this.$target.addEventListener('keyup', this.keyupHandler)
  }

  // 등록 버튼 클릭시 register() 발동
  clickEventHandler(e) {
    if (e.target.id && e.target.id === "register_btn") {
      this.register()
    }
    if (e.target.id && e.target.id === "dupEmail") {
      this.dupEmail()
    }
    if (e.target.id && e.target.id === "dupNickname") {
      this.dupNickname()
    }
  }

  async register() {
    if (!this.$email.value || !this.$password.value || !this.$passwordConfirm.value ||
      !this.$nickname.value || !this.$generation.value || !this.$campus.value <= 0) {
        console.log(this.$email.value)
        console.log(this.$password.value)
        console.log(this.$passwordConfirm.value)
        console.log(this.$nickname.value)
        console.log(this.$generation.value)
        console.log(this.$campus.value)
        alert('모든 입력값을 채워주세요')
        return
      }
    console.log('register')
    // 이전 async 실행이 완료되길 기다렸다가 await 실행
    await axios.post("https://dev.plover.co.kr/ssafy/account/signup", {
      profileImageUrl: this.$propic.value,
      email: this.$email.value,
      password: this.$password.value,
      nickname: this.$nickname.value,
      generation: this.$generation.value,
      campus: this.$campus.value
    })
    .then((res) => {
      if (res.status == 200) {
        console.log(res)
        this.$history.push('/verify')
      }
      else {
        console.log(res)
        alert('실패')
      }
    })
    .catch((err) => {
      console.log(err)
      alert('실패')
    })
  }

  async dupEmail() {
    if (this.$email.value <= 0) {
      console.log('default')
      return
    }
    await axios.get("https://dev.plover.co.kr/ssafy/account/checkDupEmail",{
      params: {
        email: this.$email.value
    }})
    .then((res) => {
      if (res.status === 200) {
        console.log(this.email)
        console.log(res)
        if (res.data.response === "success") {
          alert('이메일을 사용할 수 있습니다.')
        }
        else {
          alert('중복된 이메일입니다.')
        }
      }
    })
  }

  async dupNickname() {
    console.log(this.$nickname.value)
    if (this.$nickname.value <= 0) {
      console.log('default')
      return
    }
    await axios.get("https://dev.plover.co.kr/ssafy/account/checkDupNickName",{
      params: {
        nickName: this.$nickname.value
    }})
    .then((res) => {
      if (res.status === 200) {
        console.log(this.$nickname.value)
        console.log(res)
        if (res.data.response === "success") {
          alert('닉네임을 사용할 수 있습니다.')
        }
        else {
          alert('중복된 닉네임입니다.')
        }
      }
    })
  }

  destroy() {
    this.$target.removeEventListener('click', this.clickHandler)
    this.$dupEmail.removeEventListener('click', this.clickHandler)
    this.$dupNickname.removeEventListener('click', this.clickHandler)
    // this.$target.removeEventListener('keyup', this.keyupHandler)
  }
  
  // keyupEventHandler(e) {
  //   if (e.target.id && e.target.id === )
  // }
}