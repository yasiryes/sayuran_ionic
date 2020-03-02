import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartBadgeService } from 'src/app/services/cart-badge.service';
import { KagetService } from 'src/app/services/kaget.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pop-cart',
  templateUrl: './pop-cart.page.html',
  styleUrls: ['./pop-cart.page.scss'],
})
export class PopCartPage implements OnInit {
  cart_datas: any;

  constructor(
    private api: ApiService,
    private auth: AuthenticationService,
    private cart_badge: CartBadgeService,
    private kaget: KagetService,
    public navCtrl: NavController
  ) { 
  }

  ngOnInit() {
    this.load_cart();
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
                  // this.update_total();
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
}
