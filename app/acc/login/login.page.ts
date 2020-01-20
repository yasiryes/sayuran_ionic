import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { CartBadgeService } from 'src/app/services/cart-badge.service';

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
    private router: Router,
    private api: ApiService,
    private cart_badge: CartBadgeService
  ) { }

  dismissLogin(){
    // this.modalController.dismiss();
  }

  registerModal(){
    this.navCtrl.navigateForward('register');
  }

  login(form: NgForm){
    console.log("masuk login login.page.ts >>>>>>>>>>>>>>");
    console.log("username: " + form.value.username);
    console.log("password: " + form.value.password);
    this.authService.login(form.value.username, form.value.password).subscribe(
      data => {
        this.alertService.presentToast("Logged in");
        this.authService.getToken().then(
          (data) => {
            this.api.doGet('cart_count/'+ data +'/').subscribe(
              (data) => {
                this.cart_badge.set_count(data['count']);
              }
            )
    
          }
        )
      },
      error => {
        console.log(error);
      },
      () => {
        // this.dismissLogin();
        this.navCtrl.navigateRoot('pub');
      }
    )
  }

}
