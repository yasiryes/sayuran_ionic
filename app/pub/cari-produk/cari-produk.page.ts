import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';

@Component({
  selector: 'app-cari-produk',
  templateUrl: './cari-produk.page.html',
  styleUrls: ['./cari-produk.page.scss'],
})
export class CariProdukPage implements OnInit {
  cariDatas: any;

  constructor(
              public event: Events,
              private http: HttpClient,
              private env: EnvService,
              ) { 
    event.subscribe('produk:cari', (cari) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('ini dari pencarian page >>>>>>>>>>>>>');
      console.log(cari);
      if (cari != ''){
        this.loadHasilCari(cari);
      }else{
        this.cariDatas = [];
      }
      
    });
  }


  ngOnInit() {
  }

  loadHasilCari(cari_value){
    console.log('masuk getKategoriProduk >>>>>>>>>>>>>>>>>>>>')
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });
    console.log('after declaring header >>>>>>>>>>>>>>>>>>>>')

    this.http.get(this.env.API_URL + 'produk_cari/' + cari_value + '/', { headers: headers }).subscribe(
      res => {
        console.log('isi result >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

        // console
        this.cariDatas = res;

        console.log("Success : " + typeof(this.cariDatas));
      },
      errornya => {

      },
      () => {
        console.log(console.log('selesai manggil nya >>>>>>>>>>>>>'));
      }
    )
  }

}
