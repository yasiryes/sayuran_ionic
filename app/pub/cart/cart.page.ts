import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { KagetService } from 'src/app/services/kaget.service';
import { NavController, Events } from '@ionic/angular';
import { BadgerService } from 'src/app/services/badger.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart_datas: any;
  seen_datas: any;

  total: number = 0;

  constructor(
    private api: ApiService,
    private auth: AuthenticationService,
    private kaget: KagetService,
    public events: Events,
    public navCtrl: NavController,
    public badger: BadgerService
  ) { 
    this.load_cart();
    this.load_seen();

    events.subscribe('cart_badge:updated', 
      (jumlah) => {
        this.load_cart();
      }
    );
    // this.cart_badge.cart_count.subscribe(
    //   (data) => {
    //     this.load_cart();
    //   }
    // )
  }

  ngOnInit() {
  }

  reload(event){
    this.load_cart();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  plus_qty(cart_data){
    cart_data['jumlah'] = cart_data['jumlah'] + 1;
  }
  minus_qty(cart_data){
    if (cart_data['jumlah'] > 0){
      cart_data['jumlah'] = cart_data['jumlah'] - 1;
    }
  }

  change_qty(event, produk_id){
    console.log('qty change >');
    console.log(event.detail.value);
    console.log(produk_id);
    if (event.detail.value != undefined && event.detail.value != ''){
      console.log('valid inputan >');
      this.set_qty(produk_id, event.detail.value);

    }
  }
  
  update_total(){
    this.total = 0;
    this.cart_datas.forEach(
      cart_data => {
        this.total = this.total + (cart_data['jumlah'] * cart_data['harga_jual_produk']);
      }
    )
  }

  set_qty(produk_id, qty){
    
    this.auth.getToken().then(
      (data) => {
        const post_data = {
          token: data,
          produk_id: produk_id,
          qty: qty
        }
        this.api.doPost('cart_new/', post_data).subscribe(
          (data) => {
            console.log('sukses insert_cart >');
            // this.cart_badge.do_update();
            this.load_cart();
            
            this.badger.broadcast_cart_badge();
          },
          (err) => {
            console.log('error insert_cart >');
            console.log(err);
          }
        )
      }
    );
  }

  load_seen(){
    this.auth.getToken().then(
      (resu_get_token) => {
        this.auth.get_no_hp().then(
          (resu_get_no_hp) => {
            this.api.doGet('hist_produk_lihat/'+ resu_get_token + '/' + resu_get_no_hp + '/').subscribe(
              (resu_cart) => {
                if (resu_cart['status'] == 1){
                  this.seen_datas = resu_cart['data'];
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

  goto_checkout(){
    this.navCtrl.navigateForward('checkout');
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
                  this.update_total();
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
  goto_produk_det(id){
    this.navCtrl.navigateForward('produk-det/' + id);
  }

}
