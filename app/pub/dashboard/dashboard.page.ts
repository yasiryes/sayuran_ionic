import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { tap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  kategoriDatas: any;
  produkDatas: any;

  constructor(
    public navCtrl: NavController,
    private http: HttpClient,
    private env: EnvService,
  ) {
    console.log('constructor method >>>>>>>>>>>>>>>>>>>>');
    this.getKategoriProduk();
    this.reloadProduk(0);
  }

  ngOnInit() {
    console.log('on init >>>>>>>>>>>>>>>>>>>>');
  }

  reloadProduk(id_kat){
    // let kat = this.kat_nya
    
    console.log('isi id_kat >>>>>>>>>>>>>>>>>>>>>>>>');
    console.log(id_kat)

    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    this.http.get(this.env.API_URL + 'produk/kat/?id=' + id_kat, { headers: headers }).subscribe(
      res => {
        console.log('isi result >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

        this.produkDatas = res;
        console.log("Success : " + this.produkDatas);
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
  getKategoriProduk(){
    console.log('masuk getKategoriProduk >>>>>>>>>>>>>>>>>>>>')
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });
    console.log('after declaring header >>>>>>>>>>>>>>>>>>>>')
    // this.http.get(this.env.API_URL + 'kategori_produk/', { headers: headers }).pipe(
    //   tap(data => {
    //     console.log(data)
    //   },
    //   errornya => {
    //     console.log('error get method >>>>>>>>>>>>>>>>>>>>>>>>>>');
    //     console.log(errornya);
    //   },
    //   () => {
    //     console.log('done getting data ? >>>>>>>>>>>>>')
    //   }
    //   ),
    this.http.get(this.env.API_URL + 'kategori_produk/', { headers: headers }).subscribe(
      res => {
        console.log('isi result >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

        // console
        this.kategoriDatas = res;

        console.log("Success : " + typeof(this.kategoriDatas));
      },
      errornya => {

      },
      () => {
        console.log(console.log('selesai manggil nya >>>>>>>>>>>>>'));
      }
    )
    // );
    console.log('after calling get kategori produk >>>>>>>>>>>>>>>>>>>>');
  }

  navAccount(){
    this.navCtrl.navigateRoot('members/account');
  }

}
