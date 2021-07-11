interface RegisterResponse {
  key: string
}

interface RegisterRequest {
  username: string
  email: string
  password1: string
  password2: string
  referral_code: string
  phone_number: string
  full_name: string
  device_details: {}
  location: string
}

export { RegisterRequest, RegisterResponse }
