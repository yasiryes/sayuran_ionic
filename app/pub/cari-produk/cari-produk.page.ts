import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { Router } from '@angular/router';

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
              private router: Router
              ) { 
    event.subscribe('produk:cari', (cari) => {
      if (cari != ''){
        this.loadHasilCari(cari);
      }else{
        this.cariDatas = [];
      }
    });
  }


  ngOnInit() {
  }

  gotoCari(id, tipe){
    if(tipe == 1){

    }else if(tipe == 2){
      this.openDetailProduk(id);
    }
  }
  openDetailProduk(id){
    this.router.navigateByUrl('produk-det/' + id);
  }

  loadHasilCari(cari_value){
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    this.http.get(this.env.API_URL + 'produk_cari/' + cari_value + '/', { headers: headers }).subscribe(
      res => {
        this.cariDatas = res;
      },
      errornya => {

      },
      () => {
        console.log(console.log('selesai manggil nya >>>>>>>>>>>>>'));
      }
    )
  }

}
