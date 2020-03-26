import { Component } from '@angular/core';

import { Platform, NavController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from './services/alert.service';
import { Location } from '@angular/common';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { error } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  ionViewDidLoad() {
    console.log("I'm alive!");
  }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private router: Router,
    private location: Location,
    public modal_controller: ModalController,
  ) {
    this.initializeApp();

    this.platform.backButton.subscribeWithPriority(6666666, () => {
      console.log('path >');
      console.log(this.location.path());
      const modal_element = this.modal_controller.getTop();
      console.log('modal_element[<resolved>]');
      console.log(modal_element);
      modal_element.then(
        (resu_modal)=>{
          console.log('modal promise >>');
          console.log(resu_modal);
          if (resu_modal != undefined){
            modal_controller.dismiss();
          }else {
            if (this.location.path() == '/pub/tabs/dashboard' || this.location.path() == '/login'){
              if(window.confirm("Keluar Aplikasi ?")){
                navigator["app"].exitApp();
              }else{
                return;
              }
            }
            this.location.back();
          }
        },
        (err_resu_modal) => {
          console.log('modal promise error >>');
          console.log(err_resu_modal);
        }
      )
    })
  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

      this.authService.authenticationState.subscribe( 
        (data) => {
          console.log('changed auth isLoggedIn >');
          console.log(data);
          if (data == false){
            this.navCtrl.navigateRoot('login');

          }else{
            this.navCtrl.navigateRoot('pub/tabs/dashboard');
            // this.navCtrl.navigateRoot('ubah-detail');
            // this.navCtrl.navigateRoot('pub/tabs/cart');
            // this.navCtrl.navigateRoot('checkout');
            // http://localhost:8100/pub/tabs/order/pending
          }
        }
      )
      this.splashScreen.hide();
    });
  }

}
