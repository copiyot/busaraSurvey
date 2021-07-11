import { HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { LoginResponse } from '../models/LoginResponse'
import { RegisterRequest, RegisterResponse } from '../models/RegisterResponse'
import { ApiService } from './api.service'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
}

const httpRegisterOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: ApiService) {}

  /**
   * Login
   * 
   * @param url url
   * @param data payload
   * @returns login response
   */
  login(url: string, data: string): Promise<LoginResponse> {
    return this.http.post(url, data, httpOptions)
  }

  /**
   * Register user
   * 
   * @param url url
   * @param data payload
   * @returns register response
   */
  register(url: string, data: RegisterRequest): Promise<RegisterResponse> {
    return this.http.post(url, data, httpRegisterOptions)
  }

  /**
   * Store session cookie
   * 
   * @param userData login session data
   */
  saveSessionCookie(userData: LoginResponse){
    const data = JSON.stringify(userData);
    sessionStorage.setItem('user', data);
  }

  /**
   * Retrieve session cookie
   * 
   * @returns user cookie if exists and false otherwise
   */
  getSessionCookie(): LoginResponse{
    let userObj: LoginResponse = new LoginResponse();
    const data = sessionStorage.getItem('user');
    
    if(data){
        
         userObj = JSON.parse(data);
         return userObj;
    }

    return userObj;
  }

  /**
   * Delete session cookie
   * 
   */
  clearSessionCookie(){
      sessionStorage.removeItem('user');
  }
}
