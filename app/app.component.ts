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
      if (this.location.path() == '/pub/tabs/dashboard'){
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
      this.authService.getToken().then( (res) => {
        if (res != null || res != ""){
          console.log('isi result get_token() >>>>>>>>>>>>>>>>>>');
          console.log(res);
          this.navCtrl.navigateRoot('pub/tabs');
        }else{
          this.navCtrl.navigateRoot('login');
        }
      });
      this.splashScreen.hide();
      // console.log('initializeapp, isi logged_token : >>>>>>>>>>>>');
      // console.log(logged_token);
      // if (logged_token){
      //   // this.navCtrl.navigateRoot('pub/tabs');
        
      // }else{
        
      // }
    });
  }

  logout(){
    this.authService.logout().subscribe(
      data => {
        this.alertService.presentToast(data['message']);
      },
      error => {
        console.log(error);
      },
      () => {
        this.navCtrl.navigateRoot('/landing');
      }
    )
  }
}
