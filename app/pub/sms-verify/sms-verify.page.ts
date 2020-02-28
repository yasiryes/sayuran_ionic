import { Component, OnInit, ViewChild } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IonInput, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

declare var SMSReceive: any;

@Component({
  selector: 'app-sms-verify',
  templateUrl: './sms-verify.page.html',
  styleUrls: ['./sms-verify.page.scss'],
})
export class SmsVerifyPage implements OnInit {
  @ViewChild('kode_ver', {static: true}) kode_ver : IonInput;

  // kode_ver: string;
  no_hp: string;

  disable_send_otp: boolean;
  disable_verify: boolean;

  is_error_verify: boolean;

  sms_prefix: string;
  constructor(
    private androidPermissions: AndroidPermissions,
    private alertService: AlertService, 
    private api: ApiService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private authService: AuthenticationService,
  ) { 
    this.disable_send_otp = false;
    this.disable_verify = false;

    this.is_error_verify = false;

    this.no_hp = this.route.snapshot.paramMap.get('no_hp');


    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
    //   success => console.log('Permission granted'),
    // err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
    // );
    
    // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);

  }
  
  ngOnInit() {
    this.kode_ver.value = '';
    SMSReceive.startWatch(
      () => {
        document.addEventListener('onSMSArrive', (e: any) => {
          var IncomingSMS = e.data;
          var isi = IncomingSMS.body;
          var str_indic = 'kamu :'
          var posi = isi.indexOf(str_indic);
          var delta_posi = str_indic.length;
          var correct_posi = posi + delta_posi + 1;

          var the_pin = isi.substr(correct_posi, 4); 
          var the_prefix = isi.substr(0, 5); 

          if (the_prefix == this.sms_prefix){
            this.kode_ver.value = the_pin;
          }
        });
      },
      () => { console.log('watch start failed') }
    )
    this.do_send_otp();
  }

  do_verify(){
    const the_pin = this.kode_ver.value;
    const verify_data = {
      no_hp: this.no_hp,
      the_pin: the_pin
    }
    this.api.doPost('users/verify_register/', verify_data).subscribe(
      (res) => {
        if (res['status'] == 1){
          this.alertService.presentToast("Verifikasi Registrasi berhasil");
          this.bypass_login();
        }else{
          this.alertService.presentToast(res['message']);
        }
      }
    )
  }
  do_send_otp(){
    const otp_send_data = {
      no_hp: this.no_hp
    }
    this.api.doPost('users/send_otp/', otp_send_data).subscribe(
      (res) => {
        console.log(res);

        // this.kode_ver = res['otp_code'];  
        this.sms_prefix = res['otp_prefix'];
      }
    )
  }
  bypass_login(){
    const get_new_token_data = {
      no_hp: this.no_hp
    }
    this.api.doPost('users/new_token/', get_new_token_data).subscribe(
      (res) => {
        console.log(res);
        this.authService.set_new_token(res['token']).then(
          (res) => {
            this.authService.set_logged_in(res['token']);

            this.navCtrl.navigateRoot('pub/tabs');
          },
          (err) => {

          }
        )
      }
    )
  }

  click_verify(){
    this.disable_verify = true;

    this.do_verify();
  }
  click_send_otp(){
    this.disable_send_otp = true;

    this.do_send_otp();
  }



}
