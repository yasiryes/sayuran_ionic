import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EnvService } from './env.service';
import {Storage} from '@ionic/Storage';
import { ApiService } from './api.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { KagetService } from './kaget.service';

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
    private api: ApiService,
    private kaget: KagetService
    ) { 
      this.getToken().then(
        (resu) => {
          console.log('token result, on create auth service >>');
          console.log(resu);
          if (resu) {
            this.isLoggedIn = true;
          }else {
            this.isLoggedIn = false;
          }
          this.authenticationState.next(this.isLoggedIn);
        }
      )
    }

  login(email: String, password: String){
    const post_data = { 
      username: email,
      password: password
    } 
    this.api.doPost('users/login/', post_data).subscribe(
      (resu) => {
        if (resu['status'] == 1){
          this.set_logged_in(resu['token'], resu['no_hp']);
        }else{
          this.kaget.show_ok_dialog(resu['message']);
        }
      },
      (err) => {
      }
    );
  }

  register(username: String, fullname: String, password: String){
    return this.http.post(this.env.API_URL, {username: username, fullname: fullname, password: password});
  }

  set_logged_out(){
    this.storage.remove("token").then(
      () => {
        this.storage.remove("no_hp").then(
          () => {
            this.isLoggedIn = false;
            this.authenticationState.next(false);
          }
        );
      }
    );
    
    console.log('sukses Logout >');
  }
  set_new_token(token: String){
    return this.setToken(token);
  }
  // must be executed after setToken()
  set_logged_in(token: String, no_hp: String){
    console.log('set_logged_in >>');
    console.log(token);
    console.log(no_hp);
    this.setToken(token).then(
      () => {
        this.set_no_hp(no_hp).then(
          () => {
            this.authenticationState.next(true);
            this.isLoggedIn = true;
          }
        )
      }
    )
  }

  logout(token, no_hp){
    const post_data = {
      token: token,
      no_hp: no_hp
    }
    return this.api.doPost("users/logout/", post_data);
  }

  getToken(){
    return this.storage.get('token');
  }
  get_no_hp(){
    return this.storage.get('no_hp');
  }
  set_no_hp(no_hp){
    return this.storage.set('no_hp', no_hp);
  }
  setToken(token){
    return this.storage.set('token', token);
  }
}
