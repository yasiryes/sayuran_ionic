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
import { ApiService } from 'src/app/services/api.service';
import { KagetService } from 'src/app/services/kaget.service';

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
    private api: ApiService,
    public popController: PopoverController,
    private kaget: KagetService
  ) { 
    this.isRegisterClicked = false;
    // loadMap();
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

  inspect_alamat(alamat_str){
    setTimeout(() => {
      const url_api = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ alamat_str +'&key=' + this.env.GOOGLE_MAPS_KEY;
      this.api.doGetRaw(url_api).subscribe(
        (resu_koor) =>{
          console.log('hasil api google address >>');
          console.log(resu_koor);
        },
        (err_koor) => {
          console.log('error getting api >>');
          console.log(err_koor);
        }
      )
    }, 1500);
  }

  get_account(){
    this.authService.getToken().then(
      (resu_get_token) => {
        this.authService.get_no_hp().then(
          (resu_get_no_hp) => {
            console.log('get_account >>')
            console.log(resu_get_token);
            console.log(resu_get_no_hp);
            const acc_token_data = {
              token: resu_get_token,
              no_hp: resu_get_no_hp
            }
            this.api.doPost('users/acc_token/', acc_token_data).subscribe(
              (resu_acc_token) => {
                if (resu_acc_token['status'] == 1){
                  this.accData = resu_acc_token['data'];
                }else{
                  // session expired
                  this.kaget.show_ok_dialog(resu_acc_token['message']);
                  this.authService.set_logged_out();
                }
              },
              (err_acc_token) => {
    
              }
            )
          },
          (err_get_no_hp) => {

          }
        )
      },
      (err_get_token) => {

      }
    );
  }

}
