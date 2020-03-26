import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { tap } from 'rxjs/operators';
import { NavController, IonSegment, Events, PopoverController, ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DrawerState } from 'ion-bottom-drawer';
import { CartAddPage } from '../cart-add/cart-add.page';
import { trigger, state, style, transition, animate, AnimationBuilder, AnimationPlayer } from '@angular/animations';
import { slideInAnimation } from 'src/app/animations';
import { KagetService } from 'src/app/services/kaget.service';
import { BadgerService } from 'src/app/services/badger.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  kat_select: String = "0";
  kategoriDatas: any;
  produkDatas: any;
  selectedKatId = '';
  produkPerKat: any;
  promos: any;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(
    public navCtrl: NavController,
    private http: HttpClient,
    private env: EnvService,
    private dataService: DataService,
    private router: Router,
    public event: Events,
    private api: ApiService,
    public popoverController: PopoverController,
    public modalController: ModalController,
    private badger: BadgerService,
    private kaget: KagetService
  ) {
    kaget.show_loading(200);

    event.subscribe('produk:kat_select', (kat_s) => {
      this.kat_select = kat_s.toString();
    });
    this.getKategoriProduk();
    this.loadProdukPerKat();
    this.loadPromos();

    badger.broadcast_cart_badge();
  }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CartAddPage,
      animated: true,
    });
    return await modal.present();
  }
    
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: CartAddPage,
      event: ev,
      translucent: true,
    });
    
    return await popover.present();
    
  }

  get_pop_element(){
    return document.querySelector('.popover-wrapper');
  }

  loadPromos(){
    this.api.doGet('promo/all/').subscribe(
      (data) => {
        this.promos = data;
        console.log('isi produk per kat >>>>>>>>>');
        console.log(this.produkPerKat);
      }
    )
  }
  reloadRefresh(event){
    this.getKategoriProduk();
    this.loadProdukPerKat();
    this.loadPromos();
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }

  reloadProduk2nd(){
    this.reloadProduk(this.kat_select);
  }

  loadProdukPerKat(){
    this.api.doGet('produk_per_kat/').subscribe(
      (data) => {
        this.produkPerKat = data;
      }
    )
  }
  reloadProduk(id_kat){
    this.selectedKatId = id_kat;
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    this.http.get(this.env.API_URL + 'produk/kat/?id=' + id_kat, { headers: headers }).subscribe(
      res => {
        this.produkDatas = res;
      },
      errornya => {

      },
      () => {

      }
    )
  }
  getKategoriProduk(){
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    this.http.get(this.env.API_URL + 'kategori_produk/', { headers: headers }).subscribe(
      res => {
        this.kategoriDatas = res;
      },
      errornya => {

      },
      () => {
      }
    )
  }

  navAccount(){
    this.navCtrl.navigateRoot('members/account');
  }

  openDetailProduk(id){
    this.navCtrl.navigateForward('produk-det/' + id);
  }

  gotoSearch(){
    this.router.navigateByUrl('pub/tabs/cari_produk');
  }

  gotoPromo(id){
    this.navCtrl.navigateForward('promo-det/' + id);

  }

  gotoKategori(id){
    this.navCtrl.navigateForward('kategori-det/' + id);
  }
}
