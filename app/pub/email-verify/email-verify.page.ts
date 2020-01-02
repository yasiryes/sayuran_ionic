import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.page.html',
  styleUrls: ['./email-verify.page.scss'],
})
export class EmailVerifyPage implements OnInit {

  constructor(
    private navCtrl: NavController
    ) { }

  ngOnInit() {
  }

  gotoLogin(){
    this.navCtrl.navigateRoot('login');
  }
  
}
