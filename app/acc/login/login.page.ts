import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ngOnInit(): void {
    
  }

  constructor(
    private modalController: ModalController,
    private authService: AuthenticationService,
    private navCtrl: NavController,
    private alertService: AlertService, 
    private router: Router
  ) { }

  dismissLogin(){
    this.modalController.dismiss();
  }

  async registerModal(){
    this.dismissLogin();
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }

  login(form: NgForm){
    console.log("masuk login login.page.ts >>>>>>>>>>>>>>");
    console.log("username: " + form.value.username);
    console.log("password: " + form.value.password);
    this.authService.login(form.value.username, form.value.password).subscribe(
      data => {
        this.alertService.presentToast("Logged in");
      },
      error => {
        console.log(error);
      },
      () => {
        this.dismissLogin();
        this.navCtrl.navigateRoot('members');
      }
    )
  }

}
