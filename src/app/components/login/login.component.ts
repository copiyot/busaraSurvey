import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from 'src/app/shared/services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = ''

  password: string = ''

  emailError: string = ''

  passwordError: string = ''

  constructor(private userService: UserService,
    private router: Router,
    private cookieService: UserService) {}

  ngOnInit(): void {}

  onSubmit() {
    const valid = this.validate()
    const url = 'http://fullstack-role.busara.io/api/v1/oauth/token/'
    const payload = {
      grant_type: 'password',
      client_id: 'zVs3J7FZupB3TLPskQOy1xHLwYTRkzUSf2rdTDCu',
      client_secret:
        'Zv19oWmm416sTyjWT5Sx2r1gRwjWrXU3P5dWledQpYjxEvavS58SPtz03M8wvsgajaVLhcimmJIUUYUDad06V6HQosmPoj3TPRNjg7bgniQlooIwyFWfz8KfkM5Tdh7R',
      username: this.email,
      password: this.password,
    }

    const formBody = []

    let prop: keyof typeof payload

    for (prop in payload) {
      let encodedKey = encodeURIComponent(prop)
      let encodedValue = encodeURIComponent(payload[prop])

      formBody.push(encodedKey + '=' + encodedValue)
    }

    const encodedData = formBody.join('&')

    if (valid) {
      // console.log(this.email, this.password);
      this.userService
        .login(url, encodedData)
        .then((res) => {
          console.log(res);
          this.cookieService.saveSessionCookie(res);
          this.router.navigate(['/survey']);
        })
        .catch((err) => {
          // TODO: action on login failure
          console.log(err)
        })
    }
  }

  validate() {
    let valid = true
    this.emailError = ''
    this.passwordError = ''

    if (!this.email) {
      this.emailError = 'You must enter an email'
      valid = false
    }

    if (!this.password) {
      this.passwordError = 'You must enter password'
      valid = false
    }

    return valid
  }
}
