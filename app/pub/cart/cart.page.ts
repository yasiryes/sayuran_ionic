import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartBadgeService } from 'src/app/services/cart-badge.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart_datas: any;
  logged_token: string = '';

  total: number = 0;

  constructor(
    private api: ApiService,
    private auth: AuthenticationService,
    private cart_badge: CartBadgeService
  ) { }

  ngOnInit() {
    this.load_cart();
    this.cart_badge.cart_count.subscribe(
      (data) => {
        this.load_cart();
      }
    )
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
            this.cart_badge.do_update();
            this.load_cart();
            
            this.auth.getToken().then(
              (token) => {
                this.api.doGet('cart_count/'+ token +'/').subscribe(
                  (data) => {
                    this.cart_badge.set_count(data['count']);
                  }
                )
              }
            )
          },
          (err) => {
            console.log('error insert_cart >');
            console.log(err);
          }
        )
      }
    );
  }

  load_cart(){
    this.auth.getToken().then(
      (data) => {
        this.logged_token = data;
        this.api.doGet('cart/'+ this.logged_token +'/').subscribe(
          (data) => {
            this.cart_datas = data;
            this.cart_datas.forEach(element => {
              console.log(element);
              element['subtotal'] =  (element['harga_jual_produk'] * element['jumlah']);
            });
            this.update_total();
          }
        )

      }
    )
  }

}
