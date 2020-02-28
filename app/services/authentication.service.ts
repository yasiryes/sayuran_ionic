import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EnvService } from './env.service';
import { Users } from '../models/users';
import {Storage} from '@ionic/Storage';
import { ApiService } from './api.service';
import { CartBadgeService } from './cart-badge.service';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  isLoggedIn = false;
  token: any;

  authenticationState = new BehaviorSubject(this.isLoggedIn);

  constructor(
    private http: HttpClient,
    private storage: Storage, 
    private env: EnvService,
    private api: ApiService
    ) { }

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
    return this.http.post(this.env.API_URL + 'users/login/', post_data, httpOptions).pipe(
      tap(resu => {
        this.storage.set('token', resu['token'])
        .then(
          () => {
            console.log('token stored');
            this.authenticationState.next(true);
            
            this.storage.get('token').then(
              resu => {
                console.log(resu);
              }
            )
          },
          error => console.error('error storing item.') 
        );
        this.token = resu['token'];
        this.isLoggedIn = true;

        return resu;
      }
      
      ),
    )
  }

  register(username: String, fullname: String, password: String){
    return this.http.post(this.env.API_URL, {username: username, fullname: fullname, password: password});
  }

  set_logged_out(){
    this.isLoggedIn = false;
    this.authenticationState.next(false);
    this.storage.remove("token");

    delete this.token;

    console.log('sukses Logout >');
  }
  set_new_token(token){
    return this.storage.set('token', token);
  }
  set_logged_in(token){
    console.log('token stored');
    this.authenticationState.next(true);

    this.token = token;
    this.isLoggedIn = true;
  }

  logout(){
    const post_data = {
      token: this.token
    }
    console.log('execute logout');
    return this.api.doPost("users/logout/", post_data);
  }
  user(){
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"] + " " + this.token["access_token"]
    })

    return this.http.get<Users>(this.env.API_URL, {headers: headers})
    .pipe(
      tap(user => {
        return user;
      })
    )
  }

  getToken(){
    return this.storage.get('token')
  }
}
