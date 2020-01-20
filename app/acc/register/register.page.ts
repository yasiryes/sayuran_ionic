import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { EnvService } from 'src/app/services/env.service';
import { NavController } from '@ionic/angular';

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

  constructor(
    private api: ApiService,
    private env: EnvService,
    private navCtrl: NavController,
  ) { }

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

    this.isErrorEmail = !form.value.username.includes("@");
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
      const register_data = {
        username: form.value.username,
        fullname: form.value.fullname,
        password: form.value.pin
      }
      this.api.doPost('users/register/', register_data).subscribe(
        (res) => {
          if (res['status'] == 1){
            this.navCtrl.navigateRoot('email-verify');
          }else if (res['status'] == 0){
            this.isErrorEmail = true;
            this.emailErrorMsg = res['msg'];
          }
        }
      )
    }
  }
}
