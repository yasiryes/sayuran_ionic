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

  async show_loading(durasi: number) {
    this.is_loading = true;
    return await this.loading_controller.create({
      duration: durasi,
      message: 'Harap tunggu..',
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
    const msg_html = '<div class="div_12" style="text-align: center;"><label>'+ msg +'</><div>';
    const alert = await this.alert_controller.create({
      message: msg_html,
      buttons: ['OK']
    });
    await alert.present();
  }
}
