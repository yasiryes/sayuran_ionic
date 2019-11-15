import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import {Storage} from '@ionic/Storage';
import { tap } from 'rxjs/operators';
import { AuthResponse } from '../auth/auth-response';
import { NullAstVisitor } from '@angular/compiler';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { Users } from '../models/users';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  isLoggedIn = false;
  token: any;

  authenticationState = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private storage: NativeStorage, 
    private env: EnvService,
    ) { }

  // doLogin(users: Users): Observable<Users>{

  // }
  login(email: String, password: String){
    // const params = { 
    //   params: new HttpParams({ fromString: "email=" + email + "&password=" + password }),
    //   headers: new HttpHeaders({ 
    //     'Access-Control-Allow-Origin':'*',
    //     'Access-Control-Allow-Methods': 'GET, POST'
    //   })
    // } 

    const post_data = { 
      username: email,
      password: password
    } 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Content-Type':  'multipart/form-data',
        // 'Content-Type':  'application/x-www-form-urlencoded',
        
        // 'Accept': 'application/json'
      })
    };
    return this.http.post<Users>(this.env.API_URL + 'users/login/', post_data, httpOptions).pipe(
      tap(token => {
        console.log('isi token');
        console.log(token.username);
        console.log(token.password);
        // this.storage.setItem('token', token)
        // .then(
        //   () => {
        //     console.log('token stored');
        //   },
        //   error => console.error('error storing item.') 
        // );
        this.token = token;
        this.isLoggedIn = true;

        return token;
      }
      
      ),
    )
    // users: Users;
    // return this.http.post<Users>(this.env.API_URL + 'users/login/', post_data, httpOptions, users).subscribe(
    //   Users => {
    //     console.log(Users)
    //   }
    // )
  }

  register(username: String, fullname: String, password: String){
    return this.http.post(this.env.API_URL, {username: username, fullname: fullname, password: password});
  }

  logout(){
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"] + " " + this.token["access_token"]
    });
    return this.http.get(this.env.API_URL, { headers: headers }).pipe(
      tap(data => {
        this.storage.remove("token");
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    );

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
    return this.storage.getItem('token').then(
      data => {
        this.token = data;

        if (this.token != null){
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
      )
  }
}
