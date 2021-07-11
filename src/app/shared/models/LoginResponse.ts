class LoginResponse {
  access_token?: string;
  expires_in?: number;
  token_type?: string;
  scope?: string;
  refresh_token?: string;
  permissions = [];
}

interface LoginRequest {
  grant_type: string
  client_id: string
  client_secret: string
  username: string
  password: string
}

export { LoginRequest, LoginResponse }
