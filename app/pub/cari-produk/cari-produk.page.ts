import { Component, OnInit } from '@angular/core';
import { Events, NavController } from '@ionic/angular';
// import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { EnvService } from 'src/app/services/env.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { KagetService } from 'src/app/services/kaget.service';

@Component({
  selector: 'app-cari-produk',
  templateUrl: './cari-produk.page.html',
  styleUrls: ['./cari-produk.page.scss'],
})
export class CariProdukPage implements OnInit {
  cariDatas: any;
  allImages: any;
  seen_datas: any;

  constructor(
                public event: Events,
                // private http: HttpClient,
                private http: HTTP,
                private env: EnvService,
                private router: Router,
                private api: ApiService,
                private auth: AuthenticationService,
                public kaget: KagetService,
                public navCtrl: NavController,
              ) { 
    this.loadAllImages();
    this.load_seen();
    // event.subscribe('produk:cari', (cari) => {
    //   if (cari != ''){
    //     this.loadHasilCari(cari);
    //   }else{
    //     this.cariDatas = [];
    //   }
    // });

    
  }


  ngOnInit() {
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

  goto_produk_det(id){
    this.navCtrl.navigateForward('produk-det/' + id);
  }
  gotoCari(id, tipe){
    if(tipe == 1){
      this.router.navigateByUrl('pub/tabs/dashboard');
      this.event.publish('produk:kat_select', id);

    }else if(tipe == 2){
      this.openDetailProduk(id);
    }
  }
  openDetailProduk(id){
    this.router.navigateByUrl('produk-det/' + id);
  }

  loadAllImages(){
    console.log('masuk load all images >>>>>>>');
    this.api.doGet('produk/all/').subscribe(
      data => {
        console.log('get image all ok ! >>>>');
        this.allImages = data;
      }
    )

    // this.http.get(this.env.API_URL + 'produk/all/', {}, {}).then( 
    //   data => {
    //     console.log('isi all images >>>>>>>>>>');
    //     this.allImages = data.data;
    //   },
    //   err => {
    //     console.log('error get all images >>>>>>>>>>');
    //     console.log(err);
    //   }
    // )


    // const headers = new HttpHeaders({
    //   'Content-type': 'application/json'
    // });

    // this.http.get(this.env.API_URL + 'produk_list/all/', { headers: headers }).subscribe(
    //   res => {
    //     console.log('isi all images >>>>>>>>>>');
    //     this.allImages = res;
        
    //   },
    //   errornya => {

    //   },
    //   () => {
    //     console.log(console.log('selesai manggil nya >>>>>>>>>>>>>'));
    //   }
    // )
  }
  loadHasilCari(cari_value){
    // const headers = new HttpHeaders({
    //   'Content-type': 'application/json'
    // });
    if (cari_value == '' || cari_value == null || cari_value == undefined){
      this.cariDatas = null;
    } else {
      this.api.doGet('produk_cari/' + cari_value + '/').subscribe(
        data => {
          this.cariDatas = data;
        }
      )
    }




    // this.http.get(this.env.API_URL + 'produk_cari/' + cari_value + '/', { headers: headers }).subscribe(
    //   res => {
    //     this.cariDatas = res;
    //   },
    //   errornya => {

    //   },
    //   () => {
    //     console.log(console.log('selesai manggil nya >>>>>>>>>>>>>'));
    //   }
    // )
  }

}
