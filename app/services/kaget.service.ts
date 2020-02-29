import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class KagetService {
  is_loading: boolean;


  constructor(
    public loading_controller: LoadingController,
    public alert_controller: AlertController

  ) { }

  async show_loading() {
    this.is_loading = true;
    return await this.loading_controller.create({
      duration: 3000,
      message: 'Please Wait',
      backdropDismiss: true
    }).then(a => {
      a.present().then(() => {
        console.log('loading');
        if (!this.is_loading) {
          a.dismiss().then(() => console.log('finish'));
        }
      });
    });
  }

  async show_ok_dialog(msg) {
    const alert = await this.alert_controller.create({
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
