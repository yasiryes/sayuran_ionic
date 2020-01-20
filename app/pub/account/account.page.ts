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
import { SidemAccountPage } from './sidem-account/sidem-account.page';
import { PopoverController } from '@ionic/angular';

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
  popoverController: any;


  constructor(
    private http: HttpClient,
    private storage: Storage, 
    private env: EnvService,
    private authService: AuthenticationService,
    private alertService: AlertService, 
    public popController: PopoverController,
  ) { 
    this.isRegisterClicked = false;
  }

  ngOnInit() {
    this.get_account();
  }
  async presentPopover(ev: any) {
    const popover = await this.popController.create({
      component: SidemAccountPage,
      event: ev,
      translucent: true,
    });
    
    return await popover.present();
    
  }
  get_account(){
    this.storage.get('token').then(
      resu => {
        
        this.token = resu 

        const post_data = { 
          token: this.token
        } 
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
          })
        };
        this.http.post(this.env.API_URL + 'users/acc_token/', post_data, httpOptions).subscribe(
          resu => {
            this.accData = resu;
            if (resu['id'] == null){
              this.isLogged = false;
            }
          },
          error => {
            console.log('error hlo be e>>>>>>>>>>>>>>>>>>>>>>>>>>');
          },
          () =>{
            console.log('rampung hlo be e>>>>>>>>>>>>>>>>>>>>>>>>>>');
          }
        )
      }
    )



  }

}
