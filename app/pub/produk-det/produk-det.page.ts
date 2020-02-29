import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { DataService } from 'src/app/services/data.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';
import { CartBadgeService } from 'src/app/services/cart-badge.service';
import { KagetService } from 'src/app/services/kaget.service';

@Component({
  selector: 'app-produk-det',
  templateUrl: './produk-det.page.html',
  styleUrls: ['./produk-det.page.scss'],
})
export class ProdukDetPage implements OnInit {
  id: string;

  qty: number = 0;
  subtotal_label: number = 0;

  produkData = {};
  cart_data = {}
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private env: EnvService,
    private dataService: DataService,
    private router: Router,
    private auth: AuthenticationService,
    private api: ApiService,
    private navCtrl: NavController,
    private cart_badge: CartBadgeService,
    private kaget: KagetService,
  ) { }

  ngOnInit() {
    this.kaget.show_loading(1500);

    this.id = this.route.snapshot.paramMap.get('id');

    this.loadProduk(this.id)
    this.load_cart();
  }

  plus_qty(){
    this.qty = this.qty + 1;
    this.subtotal_label = this.produkData['harga_jual'] * this.qty;

    // this.insert_cart(produk_id, this.qty);
  }
  minus_qty(){
    this.qty = this.qty - 1;
    this.subtotal_label = this.produkData['harga_jual'] * this.qty;
  }

  click_insert_cart(){
    this.insert_cart(this.id, this.qty);
  }
  insert_cart(produk_id, qty){

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
            this.auth.getToken().then(
              (token) => {
                this.api.doGet('cart_count/'+ token +'/').subscribe(
                  (data) => {
                    this.cart_badge.set_count(data['count']);
                  }
                )
              }
            )
            
            this.navCtrl.navigateRoot('pub')
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
      (data_token) => {
        this.api.doGet('cart/'+ data_token +'/?id=' + this.id).subscribe(
          (data) => {
            console.log('sukses load cart >');
            console.log(data);
            this.cart_data = data;
            this.qty = this.cart_data['jumlah'] || 0;
          }
        )

      }
    )
  }
  loadProduk(id){
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    this.http.get(this.env.API_URL + 'produk/one/?id=' + id, { headers: headers }).subscribe(
      res => {
        console.log('isi result >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        var produk = res;
        if (produk['keterangan'] == null){
          produk['keterangan'] = '-';
        }
        this.produkData = produk;
        // console.log("Success : " + this.produkDatas);
      },
      errornya => {

      },
      () => {
        console.log(console.log('selesai manggil nya >>>>>>>>>>>>>'));
      }
    )
    // );
    console.log('after calling get produk >>>>>>>>>>>>>>>>>>>>');
  }

}
