import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _HttpClient = inject(HttpClient);
  constructor() {}
  base_url: string = 'http://localhost:3000/';
  register(body: any): Observable<any> {
    return this._HttpClient.post(`${this.base_url}user/register`, body);
  }
  login(body: any): Observable<any> {
    return this._HttpClient.post(`${this.base_url}user/login`, body);
  }
}
