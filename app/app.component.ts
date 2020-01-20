import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from './services/alert.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private router: Router,
    private location: Location
  ) {
    this.initializeApp();
    this.platform.backButton.subscribeWithPriority(6666666, () => {
      console.log('path >');
      console.log(this.location.path());
      if (this.location.path() == '/pub/tabs/dashboard' || this.location.path() == '/login'){
        if(window.confirm("Keluar Aplikasi ?")){
          navigator["app"].exitApp();
        }else{
          return;
        }
      }
      this.location.back();
    })
  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

      this.authService.authenticationState.subscribe(
        (data) => {
          console.log('changed auth isLoggedIn >');
          if (data == false){
            this.navCtrl.navigateRoot('login');

          }else{
            this.navCtrl.navigateRoot('pub/tabs');
          }
        }
      )
      this.splashScreen.hide();
    });
  }

}
