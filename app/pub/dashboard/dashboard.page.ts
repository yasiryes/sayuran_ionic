import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { tap } from 'rxjs/operators';
import { NavController, IonSegment, Events } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  // @ViewChild('kat_select', {static: true}) kat_select : IonSegment;
  kat_select: String = "0";
  // this.kat_select.value = "0";
  kategoriDatas: any;
  produkDatas: any;
  selectedKatId = '';
  // kat_select: number;

  constructor(
    public navCtrl: NavController,
    private http: HttpClient,
    private env: EnvService,
    private dataService: DataService,
    private router: Router,
    public event: Events
  ) {
    console.log('constructor method >>>>>>>>>>>>>>>>>>>>');
    this.getKategoriProduk();

    event.subscribe('produk:kat_select', (kat_s) => {
      this.kat_select = kat_s.toString();
    });
  }

  ngOnInit() {
    console.log('on init >>>>>>>>>>>>>>>>>>>>');
    this.reloadProduk(0);
    // this.kat_select = "0";
  }

  reloadRefresh(event){
    console.log('masuk reload refresh >>>>>>>>>>>>>>');
    console.log(this.selectedKatId);
    this.reloadProduk(this.selectedKatId);
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  reloadProduk2nd(){
    console.log('isi kat_select >>>>>>>>>>>>>>>>>>>>>');
    console.log(this.kat_select);
    this.reloadProduk(this.kat_select);
  }
  reloadProduk(id_kat){
    // let kat = this.kat_nya
    console.log('isi id_kat >>>>>>>>>>>>>>>>>>>>>>>>');
    console.log(id_kat)
    // console.log('isi kat_select >>>>>>>>>>>>>>>>>>>>>');
    // console.log(this.kat_select);
    this.selectedKatId = id_kat;
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

    this.http.get(this.env.API_URL + 'kategori_produk/', { headers: headers }).subscribe(
      res => {
        console.log('isi result kategori >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log(res)
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

  openDetailProduk(id){
    // this.dataService.setData(42, this.user);
    this.router.navigateByUrl('produk-det/' + id);
  }

  gotoSearch(){
    this.router.navigateByUrl('pub/tabs/cari_produk');
    // this.kat_select = "2";
  }
}
