import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartBadgeService } from 'src/app/services/cart-badge.service';
import { KagetService } from 'src/app/services/kaget.service';
import { NavController } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';

import 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import {NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions} from '@ionic-native/native-geocoder/ngx';
// NativeGeocoderReverseResult, 

declare var google;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  cart_datas: any;
  users_data: any;
  hit_inspect: number = 0;
  term$ = new Subject<string>();

  @ViewChild('map', {static: true}) map_element: ElementRef;
  map: any;

  address: string;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private api: ApiService,
    private auth: AuthenticationService,
    private cart_badge: CartBadgeService,
    private kaget: KagetService,
    public navCtrl: NavController,
    private env: EnvService
  ) { 
    this.term$.pipe(debounceTime(2000), distinctUntilChanged(), switchMap((term) => {
      console.log('delayed execute here >>');
      console.log(term);
      return EMPTY
    })).subscribe();

    this.loadMap();
  }

  ngOnInit() {
  }
  getAddressFromCoords(lattitude, longitude) {
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
      })
      .catch((error: any) =>{
        this.address = "Address Not Available!";
      });
 
  }

  load_map(lat, lng){

  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
 
      this.map = new google.maps.Map(this.map_element.nativeElement, mapOptions);
 
      this.map.addListener('tilesloaded', () => {
        console.log('accuracy',this.map);
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });
 
    }).catch((error) => {
      console.log('Error getting location', error);
    });
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
                  this.cart_datas.forEach(element => {
                    console.log(element);
                    element['subtotal'] =  (element['harga_jual_produk'] * element['jumlah']);
                  });
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
                if (resu_acc_token['status'] == 1){
                  this.users_data = resu_acc_token['data'];
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