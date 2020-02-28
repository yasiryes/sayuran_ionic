import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EnvService } from './env.service';
import {Storage} from '@ionic/Storage';
import { ApiService } from './api.service';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  isLoggedIn: boolean;
  authenticationState = new BehaviorSubject(this.isLoggedIn);

  constructor(
    private http: HttpClient,
    private storage: Storage, 
    private env: EnvService,
    private api: ApiService
    ) { 
      this.getToken().then(
        (resu) => {
          this.isLoggedIn = (resu && resu != '');
        }
      )
    }

  login(email: String, password: String){
    const post_data = { 
      username: email,
      password: password
    } 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    this.api.doPost('users/login/', httpOptions).subscribe(
      (resu) => {
        this.setToken(resu['token']).then(
          (resu_set_token) => {
            this.set_logged_in();
          },
          (err_set_token) => {

          }
        )
      },
      (err) => {

      }
    );
  }

  register(username: String, fullname: String, password: String){
    return this.http.post(this.env.API_URL, {username: username, fullname: fullname, password: password});
  }

  set_logged_out(){
    this.isLoggedIn = false;
    this.authenticationState.next(false);
    this.storage.remove("token");
    console.log('sukses Logout >');
  }
  set_new_token(token){
    return this.setToken(token);
  }
  // must be executed after setToken()
  set_logged_in(){
    this.authenticationState.next(true);
    this.isLoggedIn = true;
  }

  logout(){
    console.log('execute logout');
    this.getToken().then(
      (resu) => {
        const post_data = {
          token: resu
        }
        return this.api.doPost("users/logout/", post_data);
      },
      (err) => {

      }
    )
  }

  getToken(){
    return this.storage.get('token');
  }
  setToken(token){
    return this.storage.set('token', token);
  }
}
