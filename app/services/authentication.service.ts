import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EnvService } from './env.service';
import { Users } from '../models/users';
import {Storage} from '@ionic/Storage';

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
    private storage: Storage, 
    private env: EnvService,
    ) { }

  // doLogin(users: Users): Observable<Users>{

  // }
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
        console.log('isi token');
        console.log(resu['token']);
        this.storage.set('token', resu['token'])
        .then(
          () => {
            console.log('token stored');
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
    return this.storage.get('token').then(
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
