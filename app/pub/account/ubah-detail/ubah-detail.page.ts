import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { KagetService } from 'src/app/services/kaget.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavController, IonTextarea, Events } from '@ionic/angular';
import { Subject, EMPTY } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions} from '@ionic-native/native-geocoder/ngx';
import { Platform } from '@ionic/angular';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
declare var google;

@Component({
  selector: 'app-ubah-detail',
  templateUrl: './ubah-detail.page.html',
  styleUrls: ['./ubah-detail.page.scss'],
})
export class UbahDetailPage implements OnInit {
  users_data = {};
  
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
  marker: any;
  term$ = new Subject<string>();

  address: string;

  fwd_lat: any;
  fwd_lng: any;

  init_lat: any;
  init_lng: any;

  is_done_load_users: boolean;
  constructor(
    private api: ApiService,
    private auth: AuthenticationService,
    private kaget: KagetService,
    public navCtrl: NavController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private platform: Platform,
    public zone: NgZone,
    public events: Events
  ) {
    this.is_done_load_users = false;
    this.get_account();
    
  }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.term$.pipe(debounceTime(2000), distinctUntilChanged(), switchMap((term) => {
      console.log('delayed execute here >>');
      console.log(term);
      
      if (this.init_lng != undefined && this.init_lat != undefined){
        this.load_map(this.init_lat, this.init_lng);
        console.log('init by coordinates >>');

        this.init_lng = undefined;
        this.init_lat = undefined
      }else {
        this.locate_raw_address(term);
      }
      // this.load_map(true);
      return EMPTY
    })).subscribe();
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

  validateForm(form: NgForm){
    var isValid = true;

    this.isErrorEmail = false;
    this.isErrorFullname = false;
    
    this.emailErrorMsg = '';
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

    return isValid;
  }

  formSubmit(form: NgForm){
    var isValidated = this.validateForm(form);
    if (isValidated){
      this.disable_register = true;

      this.auth.getToken().then(
        (resu_get_token) => {
          this.auth.get_no_hp().then(
            (resu_get_no_hp) => {
              const update_data = {
                fullname: form.value.fullname,
                alamat: form.value.alamat,
                alamat_info: form.value.alamat_info,
                lat: this.fwd_lat,
                lng: this.fwd_lng,
                token: resu_get_token,
                no_hp: resu_get_no_hp
              }
              this.api.doPost('users/users_update/', update_data).subscribe(
                (res) => {
                  if (res['status'] == 1){
                    this.events.publish('account:updated');
                    this.navCtrl.navigateRoot('pub/tabs/account');
                  }else{
                    this.auth.set_logged_out();
                    this.kaget.show_ok_dialog(res['message']);
                  }
                }
              )

            },
            (err_get_no_hp) => {

            }
          )
        },
        (err_get_token) => {

        }
      )


    }
  }
  init_map(lat, lng){
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
    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'Hello World!'
    });
    this.map.addListener('click', (res) => {
      console.log('click >>');
      this.fwd_lat = res.latLng.lat();
      this.fwd_lng = res.latLng.lng();

      this.marker.setPosition(res.latLng);

      this.load_address(res.latLng.lat(), res.latLng.lng());
    });
    this.map.addListener('tilesloaded', () => {
      console.log('accuracy',this.map);
      // this.load_address(this.map.center.lat(), this.map.center.lng());
    });
    

  }

  load_map(lat, lng){
    this.fwd_lat = lat;
    this.fwd_lng = lng;

    this.load_address(lat, lng);
    let latLng = new google.maps.LatLng(lat, lng);

    this.map.setCenter(latLng);
  }
  get_account(){
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
                  this.init_lat = this.users_data['lat'];
                  this.init_lng = this.users_data['lng'];

                  this.is_done_load_users = true;
                  console.log('accData >>');
                  console.log(this.users_data);
                  this.init_map(this.users_data['lat'], this.users_data['lng']);
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
