import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { KagetService } from 'src/app/services/kaget.service';
import { NavController, IonTextarea, IonSelect, PopoverController, IonInput } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';

import 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime, distinctUntilChanged, switchMap, last } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import {NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions} from '@ionic-native/native-geocoder/ngx';
import { Platform } from '@ionic/angular';
import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { SummaryCheckoutPage } from './summary-checkout/summary-checkout.page';
// NativeGeocoderReverseResult, 

declare var google;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  cart_datas: any;
  users_data = {};

  bank_datas: any;
  bank_id: number;
  atas_nama: string;
  nomor_rek: string;

  lod_datas: any;
  selected_lod: string;

  hit_inspect: number = 0;
  term$ = new Subject<string>();

  is_tunai: boolean = true;

  @ViewChild('map', {static: true}) map_element: ElementRef;

  @ViewChild('div_tunai', {static: true}) div_tunai: ElementRef;
  @ViewChild('div_transfer', {static: true}) div_transfer: ElementRef;

  @ViewChild('nama_kirim', {static: true}) nama_kirim: IonInput;
  @ViewChild('hp_kirim', {static: true}) hp_kirim: IonInput;
  @ViewChild('alamat', {static: true}) alamat: IonTextarea;
  @ViewChild('alamat_info', {static: true}) alamat_info: IonTextarea;
  @ViewChild('bank', {static: true}) bank: IonSelect;
  @ViewChild('lodnya', {static: true}) lodnya: IonSelect;

  map: any;

  address: string;

  fwd_lat: any;
  fwd_lng: any;

  subtotal_sum: number;
  berat_kirim_sum: number;
  total_sum: number;

  jarak: number;
  ongkir: number;


  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private api: ApiService,
    private auth: AuthenticationService,
    private kaget: KagetService,
    public navCtrl: NavController,
    private env: EnvService,
    private platform: Platform,
    public zone: NgZone,
    public pop_controller: PopoverController,
    
  ) { 
    this.bank_datas = [];
    this.lod_datas = [];
    this.bank_id = 0;

    this.load_bank();
    this.load_lod();
    console.log('nama_kirim >>');
    console.log(this.nama_kirim);
    this.term$.pipe(debounceTime(2000), distinctUntilChanged(), switchMap((term) => {
      console.log('delayed execute here >>');
      console.log(term);

      this.locate_raw_address(term);
      // this.load_map(true);
      return EMPTY
    })).subscribe();

    this.is_tunai = true;
    this.atas_nama = '';
    this.nomor_rek = '';

    this.jarak = 0;
    this.ongkir = 0;
    this.subtotal_sum = 0;
    this.berat_kirim_sum = 0;
    this.total_sum = 0;

    this.load_cart();
    this.load_users();

    // this.init_map();
  }

  ngOnInit() {
  }
  onchange_opsi_bayar(ev){
    console.log('change opsi bayar >>');
    console.log(ev);
    this.is_tunai = (ev.detail.value == 'tunai');
    
    if(this.is_tunai){
      this.div_transfer.nativeElement.style.setProperty('display', 'none');
      this.div_tunai.nativeElement.style.setProperty('display', 'block');
    }else{
      this.div_tunai.nativeElement.style.setProperty('display', 'none');
      this.div_transfer.nativeElement.style.setProperty('display', 'block');
    }
  }
  onchange_bank(ev){
    console.log('onchange bank >>');
    console.log(ev);
    if (this.bank_datas == undefined){
      return;
    }
    this.bank_id = ev.target.value;
    console.log('selected bank_id >>');
    console.log(this.bank_id);
    for (var i = 0; i < this.bank_datas.length; i++) {
      if (this.bank_datas[i]['id'] == ev.target.value){
        this.atas_nama = this.bank_datas[i]['atas_nama'];
        this.nomor_rek = this.bank_datas[i]['nomor'];
      }
    }
  }
  onchange_lod(ev){
    console.log('onchange lod >>');
    console.log(ev);
    if (this.lod_datas == undefined){
      return;
    }
    this.selected_lod = ev.target.value;
  }
  async show_summary(){
    console.log('is_tunai >>');
    console.log(this.is_tunai);
    const popover = await this.pop_controller.create({
      component: SummaryCheckoutPage,
      // event: ev,
      translucent: true,
      componentProps: {
        'items': this.cart_datas,
        'sub_total': this.subtotal_sum,
        'berat_kirim': this.berat_kirim_sum,
        'nama_kirim': this.nama_kirim.value,
        'hp_kirim': this.hp_kirim.value,
        'alamat': this.alamat.value,
        'alamat_info': this.alamat_info.value,
        'is_tunai': this.is_tunai,
        'no_rek': this.nomor_rek,
        'atas_nama_rek': this.atas_nama,
        'bank_id': this.bank.value,
        'nama_bank': this.bank.selectedText,
        'ongkir': this.ongkir,
        'total': this.total_sum,
        'lat': this.fwd_lat,
        'lng': this.fwd_lng,
        'jarak_kirim': this.jarak,
        'tgl_kirim': this.selected_lod
      }
    });
    
    return await popover.present();
  }
  load_lod(){
    this.api.doGet('users/lod_send_get/').subscribe(
      (resu_lod) => {
        this.lod_datas = resu_lod;
        this.selected_lod = this.lod_datas[0]['tanggal'];
        console.log('isi lod >>');
        console.log(this.lod_datas);
      }
    )
  }
  load_address(lattitude, longitude) {
    console.log("getAddressFromCoords "+lattitude+" "+longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
 
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if(value.length>0)
          responseAddress.push(value);
 
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value+", ";
        }
        this.address = this.address.slice(0, -2);
        if (this.alamat.value == '') {
          this.alamat.value = this.address;
        }
      })
      .catch((error: any) =>{
        this.address = "Address Not Available!";
        console.log(error);
      });
 
  }

  get_ongkir(lat, lng){
    const get_ongkir_data = {
      lat: lat,
      lon: lng,
      berat_kirim: this.berat_kirim_sum
    }
    this.api.doPost('sell/ongkir_get/', get_ongkir_data).subscribe(
      (resu_get_ongkir) => {
        console.log('resu_get_ongkir >> ');
        console.log(resu_get_ongkir);

        this.jarak = resu_get_ongkir['jarak'];
        this.ongkir = resu_get_ongkir['ongkir'];

        this.total_sum = this.ongkir + this.subtotal_sum;
      },
      (err_get_ongkir) => {

      }
    )
  }

  load_map(lat, lng){
    this.load_address(lat, lng);
    this.get_ongkir(lat, lng);

    this.fwd_lat = lat;
    this.fwd_lng = lng;

    let latLng = new google.maps.LatLng(lat, lng);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.map_element.nativeElement, mapOptions);    
    var marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'Hello World!'
    });

    this.map.addListener('click', (res) => {
      console.log('click >>');

      marker.setPosition(res.latLng);

      this.load_address(res.latLng.lat(), res.latLng.lng());

      this.fwd_lat = res.latLng.lat();
      this.fwd_lng = res.latLng.lng();
    });

    this.map.addListener('tilesloaded', () => {
      console.log('accuracy',this.map);
      // this.load_address(this.map.center.lat(), this.map.center.lng());
    });
  }
  
  init_map() {
    console.log('masuk loadMap >>');
    if (this.users_data['lat'] !== undefined){
      console.log('geometry exist >>');
      this.load_map(this.users_data['lat'], this.users_data['lng']);
    }else{
      this.geolocation.getCurrentPosition().then(
        (resp) => {
          console.log(resp);
          console.log('latitude >>');
          console.log(resp.coords.latitude);
          console.log('longitude >>');
          console.log(resp.coords.longitude);
  
          this.load_map(resp.coords.latitude, resp.coords.longitude);
        },
        (err) =>{
        console.log('get current location error >>');
        console.log(err);
        }
      ).catch((error) => {
        console.log('Error getting location', error);
      });
    }
  }
  locate_raw_address(address) {
    if (address.length < 5){
      return
    }
    console.log('forwarding geocode >>');
    console.log(address);
    if (this.platform.is('cordova')) {
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      this.nativeGeocoder.forwardGeocode(address, options)
        .then((result: NativeGeocoderResult[]) => {
          if (result == []){
            return;
          }
          console.log(result);
          this.zone.run(() => {
            this.load_map(result[0].latitude, result[0].longitude);
          })
        })
        .catch((error: any) => console.log(error));
    } else {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': address }, (results, status) => {
        if (results.length == 0){
          return;
        }
        console.log('bawah');
        console.log(results.length);
        if (status == google.maps.GeocoderStatus.OK) {
          this.zone.run(() => {
            this.load_map(results[0].geometry.location.lat(), results[0].geometry.location.lng());
          })
        } else {
          alert('Error - ' + results + ' & Status - ' + status)
        }
      });
    }
  }

  load_bank(){
    console.log('masuk load_bank >>');
    this.api.doGet('profil/bank_get/').subscribe(
      (resu_bank_get) => {
        console.log('resu_bank_get >>');
        console.log(resu_bank_get);
        this.bank_datas = resu_bank_get;

        this.bank_id = this.bank_datas[0]['id'];
        this.atas_nama = this.bank_datas[0]['atas_nama'];
        this.nomor_rek = this.bank_datas[0]['nomor'];
      },
      (err_bank_get) => {
        console.log('err_bank_get >>');
        console.log(err_bank_get);
      }
    )
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
                  console.log('isi cart_data >>');
                  console.log(this.cart_datas);
                  this.cart_datas.forEach(element => {
                    console.log(element);
                    element['subtotal'] =  (element['harga_jual_produk'] * element['jumlah']);
                    this.subtotal_sum = this.subtotal_sum + element['subtotal'];
                    console.log('berat kirim >>');
                    console.log(element['berat_kirim']);
                    this.berat_kirim_sum = this.berat_kirim_sum + element['berat_kirim'];
                  });
                  this.berat_kirim_sum = Math.round(this.berat_kirim_sum);
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
  inspect_alamat(alamat_str){
    setTimeout(() => {
        const url_api = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ alamat_str +'&key=' + this.env.GOOGLE_MAPS_KEY;
        this.api.doGetRaw(url_api).subscribe(
          (resu_koor) =>{
            this.hit_inspect = this.hit_inspect + 1;
            console.log('hasil api google address >>');
            console.log(resu_koor);
            this.hit_inspect = 0;
          },
          (err_koor) => {
            console.log('error getting api >>');
            console.log(err_koor);
          }
        )
    }, 3000);
  }


  load_users(){
    console.log('masuk load_users >>');
    this.auth.getToken().then(
      (resu_get_token) => {
        this.auth.get_no_hp().then(
          (resu_get_no_hp) => {
            const acc_token_data = {
              token: resu_get_token,
              no_hp: resu_get_no_hp
            }
            this.api.doPost('users/acc_token/', acc_token_data).subscribe(
              (resu_acc_token) => {
                console.log('isi acc_token >>');
                console.log(resu_acc_token);
                if (resu_acc_token['status'] == 1){
                  this.users_data = resu_acc_token['data'];
                  this.init_map();
                }else{
                  // session expired
                  this.kaget.show_ok_dialog(resu_acc_token['message']);
                  this.auth.set_logged_out();
                }
              },
              (err_acc_token) => {
    
              }
            )
          },
          (err_get_no_hp) => {

          }
        )
      },
      (err_get_token) => {

      }
    );
  }

}