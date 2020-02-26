import { Component, OnInit } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
declare var SMSReceive: any;

@Component({
  selector: 'app-sms-verify',
  templateUrl: './sms-verify.page.html',
  styleUrls: ['./sms-verify.page.scss'],
})
export class SmsVerifyPage implements OnInit {
  kode_ver: string;
  constructor(
    private androidPermissions: AndroidPermissions,
    private alertService: AlertService, 
    private api: ApiService,
  ) { 
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
      success => console.log('Permission granted'),
    err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
    );
    
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);

  }

  ngOnInit() {
    SMSReceive.startWatch(
      () => {
        document.addEventListener('onSMSArrive', (e: any) => {
          var IncomingSMS = e.data;
          // this.processSMS(IncomingSMS);
          console.log('sms in >>');
          this.alertService.presentToast(IncomingSMS.body);
          var isi = IncomingSMS.body;
          var str_indic = 'kamu :'
          var posi = isi.indexOf(str_indic);
          var delta_posi = str_indic.length;
          var correct_posi = posi + delta_posi + 1;
          var the_pin = isi.substr(correct_posi, 4); 

          this.kode_ver = the_pin;
          
          const logs_data = {
            isi: the_pin
          }
          this.api.doPost('tools/logs_new/', logs_data).subscribe(
            (res) => {
              console.log(res);
            }
          )
        });
      },
      () => { console.log('watch start failed') }
    )
  }

}
