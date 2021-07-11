import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/shared/services/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css'],
})
export class RegisterComponent implements OnInit {
  email: string = ''

  password: string = ''

  confirmPassword: string = ''

  fullName: string = ''

  phoneNumber: string = ''

  emailError: string = ''

  passwordError: string = ''

  confirmPasswordError: string = ''

  samePasswordError: string = ''

  fullNameError: string = ''

  phoneNumberError: string = ''

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onSubmit() {
    const valid = this.validate()
    const url = 'http://fullstack-role.busara.io/api/v1/users/registration/'
    const payload = {
      username: this.email,
      email: this.email,
      password1: this.password,
      password2: this.confirmPassword,
      referral_code: '',
      phone_number: this.phoneNumber,
      full_name: this.fullName,
      device_details: { device: 'Dummy' },
      location: 'Dummy',
    }

    if (valid) {
      // console.log(this.email, this.password, this.confirmPassword, this.fullName, this.phoneNumber);
      this.userService
        .register(url, payload)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  validate() {
    let valid = true
    this.emailError = ''
    this.passwordError = ''
    this.confirmPasswordError = ''
    this.samePasswordError = ''
    this.fullNameError = ''
    this.phoneNumberError = ''

    if (!this.email) {
      this.emailError = 'You must enter an email'
      valid = false
    }

    if (!this.password) {
      this.passwordError = 'You must enter password'
      valid = false
    }

    if (!this.confirmPassword) {
      this.confirmPasswordError = 'Please Confirm password'
      valid = false
    }

    if (this.confirmPassword && this.password !== this.confirmPassword) {
      this.samePasswordError = "Passwords don't match"
      valid = false
    }

    if (!this.fullName) {
      this.fullNameError = 'Please enter full name'
      valid = false
    }

    if (!this.phoneNumber) {
      this.phoneNumberError = 'Please enter full name'
      valid = false
    }

    return valid
  }
}
