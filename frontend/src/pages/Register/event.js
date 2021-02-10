import axios from 'axios'

export default class Event {
  constructor($history) {
    this.$history = $history
  }

  // setState($state) {
  //   this.$state = $state
  // }

  setRegister($register) {
    this.$register = $register
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

    this.$register.addEventListener('click', this.clickHandler)
    this.$dupEmail.addEventListener('click', this.clickHandler)
    this.$dupNickname.addEventListener('click', this.clickHandler)
  }

  // 등록 버튼 클릭시 register() 발동
  clickEventHandler(e) {
    if (e.target.id && e.target.id === "register") {
      this.register()
    }
    if (e.target.id && e.target.id === "dupEmail") {
      this.validEmail(this.$email.value)
    }
    if (e.target.id && e.target.id === "dupNickname") {
      this.dupNickname()
    }
  }

  validEmail(str) {
    let valid = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (valid.test(str)) {
      this.dupEmail()
    }
    else {
      console.log(str)
      alert('이메일 형식이 아닙니다.')
      return
    }
  }

  async dupEmail() {
    let emailChecked = false
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
        console.log(this.$email.value)
        console.log(res)
        if (res.data.response === "success") {
          alert('이메일을 사용할 수 있습니다.')
          let emailChecked = true
        }
        else {
          alert('중복된 이메일입니다.')
        }
      }
    })
  }

  async dupNickname() {
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
  
  async register() {
    if (this.$propic.value === undefined) {
      this.$propic=''
    }
    console.log(this.$propic.value)
    if (!this.$email.value || !this.$password.value || !this.$passwordConfirm.value ||
      !this.$nickname.value || !this.$generation.value || !this.$campus.value === true) {
        alert('모든 입력값을 채워주세요.')
        return
      }
    if (this.emailChecked === false) {
      alert('이메일 중복 확인을 해 주세요.')
      return
    }
    if (this.nickChecked === false) {
      alert('닉네임 중복 확인을 해 주세요.')
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

  destroy() {
    this.$register.removeEventListener('click', this.clickHandler)
    this.$dupEmail.removeEventListener('click', this.clickHandler)
    this.$dupNickname.removeEventListener('click', this.clickHandler)
  }
}