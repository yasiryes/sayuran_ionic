import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from, Subject, EMPTY } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { EnvService } from 'src/app/services/env.service';
import { NavController, IonTextarea, IonInput } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import {NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions} from '@ionic-native/native-geocoder/ngx';
import { Platform } from '@ionic/angular';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
declare var google;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  isErrorEmail = false;
  emailErrorMsg = '';

  isErrorPin = false;
  pinErrorMsg = '';

  isErrorPinUlang = false;
  pinUlangErrorMsg = '';

  isErrorFullname = false;
  fullNameErrorMsg = '';

  disable_register = false;


  @ViewChild('map', {static: true}) map_element: ElementRef;
  @ViewChild('alamat', {static: true}) alamat: IonTextarea;

  map: any;
  term$ = new Subject<string>();

  address: string;

  fwd_lat: any;
  fwd_lng: any;

  constructor(
    private api: ApiService,
    private env: EnvService,
    private navCtrl: NavController,
    private alertService: AlertService, 
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private platform: Platform,
    public zone: NgZone,
    private auth: AuthenticationService,
  ) {
    this.init_map();

    this.term$.pipe(debounceTime(2000), distinctUntilChanged(), switchMap((term) => {
      console.log('delayed execute here >>');
      console.log(term);
      
      this.locate_raw_address(term);
      // this.load_map(true);
      return EMPTY
    })).subscribe();
   }

  ngOnInit() {
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
      });
 
  }

  load_map(lat, lng){
    this.fwd_lat = lat;
    this.fwd_lng = lng;

    this.load_address(lat, lng);

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
      this.fwd_lat = res.latLng.lat();
      this.fwd_lng = res.latLng.lng();

      marker.setPosition(res.latLng);

      this.load_address(res.latLng.lat(), res.latLng.lng());
    });

    this.map.addListener('tilesloaded', () => {
      console.log('accuracy',this.map);
      // this.load_address(this.map.center.lat(), this.map.center.lng());
    });
  }
  
  init_map() {
    console.log('masuk loadMap >>');
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

  validateForm(form: NgForm){
    var isValid = true;

    this.isErrorPin = false;
    this.isErrorPinUlang = false;
    this.isErrorEmail = false;
    this.isErrorFullname = false;
    
    this.emailErrorMsg = '';
    this.pinErrorMsg = '';
    this.pinUlangErrorMsg = '';
    this.fullNameErrorMsg = '';

    // this.isErrorEmail = !form.value.username.includes("@");
    
    this.isErrorEmail = false;
    if (this.isErrorEmail){
      isValid = false;

      this.emailErrorMsg = 'email tidak valid.';
    }

    this.isErrorFullname = form.value.fullname < 1;
    if (this.isErrorFullname){
      isValid = false;

      this.fullNameErrorMsg = 'Isian Fullname tidak boleh kosong.';
    }

    var pinVal = form.value.pin;
    var pinUlangVal = form.value.ulangPin;
    
    this.isErrorPin = pinVal.length < 6;
    if (this.isErrorPin){
      isValid = false;

      this.pinErrorMsg = 'PIN tidak boleh kurang dari 6 digit.';
    }

    this.isErrorPinUlang = pinVal != pinUlangVal;
    if(this.isErrorPinUlang){
      isValid = false;

      this.pinUlangErrorMsg = 'Ulang PIN harus sama.';
    }

    return isValid;
  }

  formSubmit(form: NgForm){
    var isValidated = this.validateForm(form);
    if (isValidated){
      this.disable_register = true;
      const register_data = {
        username: form.value.username,
        fullname: form.value.fullname,
        password: form.value.pin,
        alamat: form.value.alamat,
        alamat_info: form.value.alamat_info,
        lat: this.fwd_lat,
        lng: this.fwd_lng,
      }
      this.api.doPost('users/register/', register_data).subscribe(
        (res) => {
          if (res['status'] == 1){
            this.navCtrl.navigateRoot('sms-verify/' + register_data['username']);
          }else if (res['status'] == 0){
            this.isErrorEmail = true;
            this.emailErrorMsg = res['msg'];
            this.disable_register = false;
            const logs_data = {
              isi: 'gagal'
            }
            this.api.doPost('tools/logs_new/', logs_data).subscribe(
              (res) => {
                console.log(res);
              }
            )
          }


          // const get_new_token_data = {
          //   no_hp: form.value.username
          // }
          // this.api.doPost('users/new_token/', get_new_token_data).subscribe(
          //   (res) => {
          //     console.log(res);
          //     this.auth.set_logged_in(res['token'], res['no_hp']);
          //   }
          // )
        }
      )
    }
  }
}
