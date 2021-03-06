import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { DataService } from 'src/app/services/data.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ApiService } from 'src/app/services/api.service';
import { NavController, Events } from '@ionic/angular';
import { KagetService } from 'src/app/services/kaget.service';
import { BadgerService } from 'src/app/services/badger.service';

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
    private kaget: KagetService,
    public events: Events,
    public badger: BadgerService
  ) {
    this.kaget.show_loading(200);

    this.id = this.route.snapshot.paramMap.get('id');

    this.loadProduk(this.id)
    this.load_cart();

   }

  ngOnInit() {
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
            this.badger.broadcast_cart_badge();
            
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
        this.auth.get_no_hp().then(
          (resu_get_no_hp) => {
            this.api.doGet('cart/'+ data_token +'/'+ resu_get_no_hp +'/?id=' + this.id).subscribe(
              (resu_cart) => {
                if (resu_cart['status'] == 1){
                  this.cart_data = resu_cart['data'];
                  this.qty = this.cart_data['jumlah'] || 0;
                }else{
                  this.kaget.show_ok_dialog(resu_cart['message'])

                  this.auth.set_logged_out();
                }
              }
            )
          }
        )
      }
    )
  }
  loadProduk(id){

    this.auth.getToken().then(
      (data_token) => {
        this.auth.get_no_hp().then(
          (resu_get_no_hp) => {
            this.api.doGet('produk/one/?id=' + id + '&token=' + data_token + '&no_hp=' + resu_get_no_hp).subscribe(
              (resu_get_produk) => {
                if (resu_get_produk['status'] == 1) {
                  var produk = resu_get_produk['data'];
                  console.log('isi produk >>');
                  console.log(produk);
                  if (produk['keterangan'] == null){
                    produk['keterangan'] = '-';
                  }
                  this.produkData = produk;
                }else if (resu_get_produk['status'] == 0){
                  this.kaget.show_ok_dialog(resu_get_produk['message'])

                  this.auth.set_logged_out();
                }else if (resu_get_produk['status'] == 2){
                  this.kaget.show_ok_dialog(resu_get_produk['message'])

                  this.navCtrl.back();
                }
              },
              (err_get_produk) => {

              }
            )
          }
        )
      }
    )

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
