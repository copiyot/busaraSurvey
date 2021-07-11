import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * This method is used to send a POST request to the server. The request is excpected to create a new object in the sever.
   *
   * @template TRequest The request type
   * @template Promise The response type
   *
   * @param {string} url The server end point
   * @param {TRequest} payload The request payload
   * @param {number} timeout The timeout to apply to the request
   *
   * @returns {Promise<TResponse>}
   *
   * @memberOf ApiService
   */
  post<TRequest, TResponse>(
    url: string,
    payload: TRequest,
    httpOptions: any,
    timeout = 300000,
  ): Promise<TResponse> {
    return this.http
      .post<TResponse>(url, payload, httpOptions)
      .toPromise()
      .then((res) => {
        return res
      })
      .catch((error) => {
        return error
      })
  }

  /**
   * Sends a GET request
   *
   * @template TResponse The response payload
   * @param {string} url The server end point
   * @param {number} timeout The timeout to apply to the request
   *
   * @returns {Promise<TResponse>}
   *
   * @memberof ApiService
   */
  get<TResponse>(
    url: string,
    httpOptions: any,
    timeout = 300000,
  ): Promise<TResponse> {
    return this.http
      .get<TResponse>(url, httpOptions)
      .toPromise()
      .then((res) => {
        return res
      })
      .catch((error) => {
        return error
      })
  }
}
