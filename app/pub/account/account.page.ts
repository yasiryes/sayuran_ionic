import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Storage} from '@ionic/Storage';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';
import { SidemAccountPage } from './sidem-account/sidem-account.page';
import { PopoverController, ActionSheetController, NavController, Events } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { KagetService } from 'src/app/services/kaget.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  accData = {};

  auau: string = 'yasir';
  token: any;
  isLogged: boolean;
  isRegisterClicked: boolean;
  popoverController: any;


  constructor(
    private http: HttpClient,
    private storage: Storage, 
    private env: EnvService,
    private authService: AuthenticationService,
    private alertService: AlertService, 
    private api: ApiService,
    public popController: PopoverController,
    private kaget: KagetService,
    public action_controller: ActionSheetController,
    public navCtrl: NavController,
    public events: Events,
    private camera: Camera,
    private auth: AuthenticationService
  ) { 
    this.isRegisterClicked = false;
    events.subscribe('account:updated', 
      () => {
        this.get_account();
      }
    )
    // loadMap();
  }

  ngOnInit() {
    this.get_account();
  }

  async show_akun_opt() {
    const actionSheet = await this.action_controller.create({
      cssClass: 'custom_sheet',
      buttons: [
        {
          text: 'Ubah Detail',
          // icon: 'brush',
          handler: () => {
            this.show_edit_profil();
          }
        },
        {
          text: 'Ubah Foto Profil',
          // icon: 'brush',
          handler: () => {
            this.show_foto_opt();
          }
        },
        {
          text: 'Logout',
          icon: 'walk',
          // role: 'cancel',
          cssClass: 'action_red',
          handler: () => {
            this.show_logout_opt();
          }
        },
      ]
    });
    await actionSheet.present();
  }

  click_logout(){
    this.auth.getToken().then(
      (get_token_resu) => {
        this.auth.get_no_hp().then(
          (get_no_hp_resu) => {
            this.auth.logout(get_token_resu, get_no_hp_resu).subscribe( 
              (data) => {
                // if (this.popController.getTop()) {
                //   this.popController.dismiss()
                // };
                this.auth.set_logged_out();
              },
              (err_logout) => {
    
              }
            );
          },
          (get_no_hp_err) => {

          }
        )
      }
    )
  }
  async show_logout_opt() {
    const actionSheet = await this.action_controller.create({
      cssClass: 'custom_sheet',
      header: 'Keluar Aplikasi ?',
      buttons: [
        {
          text: 'Ya',
          // icon: 'brush',
          handler: () => {
            this.click_logout();
          }
        },
        {
          text: 'Batal',
          // icon: 'brush',
          role: 'cancel',
          handler: () => {
            // this.set_selesai(id);
          }
        },
      ]
    });
    await actionSheet.present();
  }

  async show_foto_opt() {
    const actionSheet = await this.action_controller.create({
      cssClass: 'custom_sheet',
      header: 'Ubah Foto Profil',
      buttons: [
        {
          text: 'Galeri',
          // icon: 'brush',
          handler: () => {
            this.click_galeri();
          }
        },
        {
          text: 'Kamera',
          // icon: 'brush',
          handler: () => {
            this.click_kamera();
          }
        },
      ]
    });
    await actionSheet.present();
  }
  click_galeri(){
    // this.modal_controller.dismiss();
    const options: CameraOptions = {
      quality: 80,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):'data:image/jpeg;base64,' +
      let base64Image = imageData;
      console.log('base64Image >> ');
      console.log(base64Image);
      this.authService.getToken().then(
        (resu_get_token) => {
          this.authService.get_no_hp().then(
            (resu_get_no_hp) => {
              const update_data = {
                gambar: base64Image,
              }
              this.api.doPost('users/users_photo_update/', update_data).subscribe(
                (resu_upload_users_photo) => {
                  console.log('resu_upload_users_photo >>');
                  console.log(resu_upload_users_photo);
                  this.events.publish('account:updated');
                },
                (err_upload_bukti_tf) => {
                  console.log('err_upload_bukti_tf >>');
                  console.log(err_upload_bukti_tf);
                }
              )
            }
          )
        }
      )
    }, (err) => {
     // Handle error
    });
  }

  click_kamera(){
    // this.modal_controller.dismiss();
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):'data:image/jpeg;base64,' +
      let base64Image = imageData;
      console.log('base64Image >> ');
      console.log(base64Image);

      this.authService.getToken().then(
        (resu_get_token) => {
          this.authService.get_no_hp().then(
            (resu_get_no_hp) => {
              const update_data = {
                gambar: base64Image,
              }
              this.api.doPost('users/users_photo_update/', update_data).subscribe(
                (resu_upload_users_photo) => {
                  console.log('resu_upload_users_photo >>');
                  console.log(resu_upload_users_photo);
                  this.events.publish('account:updated');
                },
                (err_upload_bukti_tf) => {
                  console.log('err_upload_bukti_tf >>');
                  console.log(err_upload_bukti_tf);
                }
              )
            }
          )
        }
      )
    }, (err) => {
     // Handle error
    });
  }
  async presentPopover(ev: any) {
    const popover = await this.popController.create({
      component: SidemAccountPage,
      event: ev,
      translucent: true,
    });
    
    return await popover.present();
  }

  show_edit_profil(){
    this.navCtrl.navigateForward('ubah-detail');
  }

  inspect_alamat(alamat_str){
    setTimeout(() => {
      const url_api = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ alamat_str +'&key=' + this.env.GOOGLE_MAPS_KEY;
      this.api.doGetRaw(url_api).subscribe(
        (resu_koor) =>{
          console.log('hasil api google address >>');
          console.log(resu_koor);
        },
        (err_koor) => {
          console.log('error getting api >>');
          console.log(err_koor);
        }
      )
    }, 3000);
  }

  get_account(){
    this.authService.getToken().then(
      (resu_get_token) => {
        this.authService.get_no_hp().then(
          (resu_get_no_hp) => {
            const acc_token_data = {
              token: resu_get_token,
              no_hp: resu_get_no_hp
            }
            this.api.doPost('users/acc_token/', acc_token_data).subscribe(
              (resu_acc_token) => {
                if (resu_acc_token['status'] == 1){
                  this.accData = resu_acc_token['data'];

                  console.log('accData >>');
                  console.log(this.accData);
                }else{
                  // session expired
                  this.kaget.show_ok_dialog(resu_acc_token['message']);
                  this.authService.set_logged_out();
                }
              },
              (err_acc_token) => {
    
              }
            )
          },
          (err_get_no_hp) => {

          }
        )
      },
      (err_get_token) => {

      }
    );
  }

}
