import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartBadgeService } from 'src/app/services/cart-badge.service';
import { KagetService } from 'src/app/services/kaget.service';
import { NavController } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  cart_datas: any;
  users_data: any;
  hit_inspect: number = 0;

  constructor(
    private api: ApiService,
    private auth: AuthenticationService,
    private cart_badge: CartBadgeService,
    private kaget: KagetService,
    public navCtrl: NavController,
    private env: EnvService
  ) { 
    this.load_cart();
  }

  ngOnInit() {
  }

  load_cart(){
    this.auth.getToken().then(
      (resu_get_token) => {
        this.auth.get_no_hp().then(
          (resu_get_no_hp) => {
            this.api.doGet('cart/'+ resu_get_token + '/' + resu_get_no_hp + '/').subscribe(
              (resu_cart) => {
                if (resu_cart['status'] == 1){
                  this.cart_datas = resu_cart['data'];
                  this.cart_datas.forEach(element => {
                    console.log(element);
                    element['subtotal'] =  (element['harga_jual_produk'] * element['jumlah']);
                  });
                }else {
                  this.kaget.show_ok_dialog(resu_cart['message']);

                  this.auth.set_logged_out();
                }
              }
            )
          },
          (err_get_no_hp) => {

          }
        )
      }
    )
  }
  inspect_alamat(alamat_str){
    setTimeout(() => {
      if (this.hit_inspect == 1){
        const url_api = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ alamat_str +'&key=' + this.env.GOOGLE_MAPS_KEY;
        this.api.doGetRaw(url_api).subscribe(
          (resu_koor) =>{
            this.hit_inspect = this.hit_inspect + 1;
            console.log('hasil api google address >>');
            console.log(resu_koor);
            this.hit_inspect = 0;
          },
          (err_koor) => {
            console.log('error getting api >>');
            console.log(err_koor);
          }
        )

      }
    }, 3000);
  }
  load_users(){
    this.auth.getToken().then(
      (resu_get_token) => {
        this.auth.get_no_hp().then(
          (resu_get_no_hp) => {
            const acc_token_data = {
              token: resu_get_token,
              no_hp: resu_get_no_hp
            }
            this.api.doPost('users/acc_token/', acc_token_data).subscribe(
              (resu_acc_token) => {
                if (resu_acc_token['status'] == 1){
                  this.users_data = resu_acc_token['data'];
                }else{
                  // session expired
                  this.kaget.show_ok_dialog(resu_acc_token['message']);
                  this.auth.set_logged_out();
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