import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { EnvService } from 'src/app/services/env.service';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  isErrorEmail = false;
  emailErrorMsg = '';

  isErrorPin = false;
  pinErrorMsg = '';

  isErrorPinUlang = false;
  pinUlangErrorMsg = '';

  isErrorFullname = false;
  fullNameErrorMsg = '';

  disable_register = false;

  constructor(
    private api: ApiService,
    private env: EnvService,
    private navCtrl: NavController,
    private alertService: AlertService, 
    private androidPermissions: AndroidPermissions
  ) {

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
      success => console.log('Permission granted'),
    err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
    );
    
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);

   }

  ngOnInit() {
  }

  validateForm(form: NgForm){
    var isValid = true;

    this.isErrorPin = false;
    this.isErrorPinUlang = false;
    this.isErrorEmail = false;
    this.isErrorFullname = false;
    
    this.emailErrorMsg = '';
    this.pinErrorMsg = '';
    this.pinUlangErrorMsg = '';
    this.fullNameErrorMsg = '';

    // this.isErrorEmail = !form.value.username.includes("@");
    
    this.isErrorEmail = false;
    if (this.isErrorEmail){
      isValid = false;

      this.emailErrorMsg = 'email tidak valid.';
    }

    this.isErrorFullname = form.value.fullname < 1;
    if (this.isErrorFullname){
      isValid = false;

      this.fullNameErrorMsg = 'Isian Fullname tidak boleh kosong.';
    }

    var pinVal = form.value.pin;
    var pinUlangVal = form.value.ulangPin;
    
    this.isErrorPin = pinVal.length < 6;
    if (this.isErrorPin){
      isValid = false;

      this.pinErrorMsg = 'PIN tidak boleh kurang dari 6 digit.';
    }

    this.isErrorPinUlang = pinVal != pinUlangVal;
    if(this.isErrorPinUlang){
      isValid = false;

      this.pinUlangErrorMsg = 'Ulang PIN harus sama.';
    }

    return isValid;
  }

  formSubmit(form: NgForm){
    var isValidated = this.validateForm(form);
    if (isValidated){
      this.disable_register = true;
      const register_data = {
        username: form.value.username,
        fullname: form.value.fullname,
        password: form.value.pin
      }
      this.api.doPost('users/register/', register_data).subscribe(
        (res) => {
          if (res['status'] == 1){
            this.navCtrl.navigateRoot('sms-verify/' + register_data['username']);
          }else if (res['status'] == 0){
            this.isErrorEmail = true;
            this.emailErrorMsg = res['msg'];
            const logs_data = {
              isi: 'gagal'
            }
            this.api.doPost('tools/logs_new/', logs_data).subscribe(
              (res) => {
                console.log(res);
              }
            )
          }
        }
      )
    }
  }
}
