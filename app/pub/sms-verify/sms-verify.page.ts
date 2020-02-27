import { Component, OnInit } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var SMSReceive: any;

@Component({
  selector: 'app-sms-verify',
  templateUrl: './sms-verify.page.html',
  styleUrls: ['./sms-verify.page.scss'],
})
export class SmsVerifyPage implements OnInit {
  kode_ver: string;
  no_hp: string;
  disable_send_otp: boolean;
  sms_prefix: string;
  constructor(
    private androidPermissions: AndroidPermissions,
    private alertService: AlertService, 
    private api: ApiService,
    private route: ActivatedRoute,
  ) { 
    this.disable_send_otp = false;

    this.no_hp = this.route.snapshot.paramMap.get('no_hp');

    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
    //   success => console.log('Permission granted'),
    // err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
    // );
    
    // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);

  }

  ngOnInit() {
    SMSReceive.startWatch(
      () => {
        document.addEventListener('onSMSArrive', (e: any) => {
          var IncomingSMS = e.data;
          console.log('sms in >>');
          this.alertService.presentToast(IncomingSMS.body);
          var isi = IncomingSMS.body;
          var str_indic = 'kamu :'
          var posi = isi.indexOf(str_indic);
          var delta_posi = str_indic.length;
          var correct_posi = posi + delta_posi + 1;

          var the_pin = isi.substr(correct_posi, 4); 
          var the_prefix = isi.substr(0, 5); 

          if (the_prefix == this.sms_prefix){
            this.kode_ver = the_pin;
          }
          const logs_data = {
            isi: the_pin
          }
          this.api.doPost('tools/logs_new/', logs_data).subscribe(
            (res) => {
              console.log(res);
            }
          )
          const logs_data2 = {
            isi: 'the_prefix : ' + the_prefix
          }
          this.api.doPost('tools/logs_new/', logs_data2).subscribe(
            (res) => {
              console.log(res);
            }
          )
          const logs_data3 = {
            isi: 'sms_prefix : ' + this.sms_prefix
          }
          this.api.doPost('tools/logs_new/', logs_data3).subscribe(
            (res) => {
              console.log(res);
            }
          )
        });
      },
      () => { console.log('watch start failed') }
    )
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

}
