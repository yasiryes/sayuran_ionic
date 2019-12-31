import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  isErrorEmail = false;
  emailErrorMsg = '';
  constructor() { }

  ngOnInit() {
  }

  emailFormSubmit(form: NgForm){
    console.log("isi email submit >>>")
    console.log(form.value.username);
    this.isErrorEmail = !form.value.username.includes("@");
    if (this.isErrorEmail){
      this.emailErrorMsg = 'email tidak valid.';
    }else{
      this.emailErrorMsg = '';
    }
  }
}
