import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Storage} from '@ionic/Storage';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  accData = {};

  auau: string = 'yasir';
  token: any;
  isLogged: boolean;
  isRegisterClicked: boolean;


  constructor(
    private http: HttpClient,
    private storage: Storage, 
    private env: EnvService,
    private authService: AuthenticationService,
    private alertService: AlertService, 
  ) { 
    console.log('construtor account >>>>>>>>>>>>>>>>>>>>>>>');
    this.isRegisterClicked = false;
  }

  ngOnInit() {
    console.log('on init acc>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    this.get_account();
  }

  get_account(){
    console.log('masuk get_account >>>>>>>>>>>>>>>>>>>>>>>>>>>');
    this.storage.get('token').then(
      resu => {
        
        this.token = resu 

        console.log('get storage >>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log(resu);

        const post_data = { 
          token: this.token
        } 
        console.log('isi post Data >>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log(post_data);
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
          })
        };
        console.log('isi httpoption >>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log(httpOptions);
        console.log('isi api url >>>>>>>>>>>>>>>>>>>>>>>>');
        console.log(this.env.API_URL);
        this.http.post(this.env.API_URL + 'users/acc_token/', post_data, httpOptions).subscribe(
          resu => {
            console.log('sukses acc_token >>>>>>>>>>>>>>>>>>>>>>>>>');
            this.accData = resu;
            if (resu['id'] == null){
              this.isLogged = false;
            }
            console.log(resu);
          },
          error => {
            console.log('error hlo be e>>>>>>>>>>>>>>>>>>>>>>>>>>');
          },
          () =>{
            console.log('rampung hlo be e>>>>>>>>>>>>>>>>>>>>>>>>>>');
          }
        )

        // return this.http.post(this.env.API_URL + 'users/acc_token/', post_data, httpOptions).pipe(
        //   tap(resu => {
        //     console.log('sukses acc_token >>>>>>>>>>>>>>>>>>>>>>>>>');
        //     this.accData = resu;
        //     console.log(resu);
        //   },
        //   error => {
        //     console.log('error hlo be e>>>>>>>>>>>>>>>>>>>>>>>>>>');
        //     console.log(error);
        //   },
        //   () => {
        //     console.log('weleh >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        //   }
          
        //   ),
        // )

      }
    )



  }

  // onSubmitLogin(form: NgForm){
  //   console.log("masuk login login.page.ts >>>>>>>>>>>>>>");
  //   console.log("username: " + form.value.username);
  //   console.log("password: " + form.value.password);
  //   this.authService.login(form.value.username, form.value.password).subscribe(
  //     data => {
  //       this.alertService.presentToast("Logged in");
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //     () => {
  //       this.isLogged = true;
  //     }
  //   )
  // }
  // onClickRegister(){
  //   this.isRegisterClicked = true;
  // }

}
