import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/Storage';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { CartAddPageModule } from './pub/cart-add/cart-add.module';
import { SidemAccountPageModule } from './pub/account/sidem-account/sidem-account.module';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { PopCartPageModule } from './pub/tabs/pop-cart/pop-cart.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { SummaryCheckoutPageModule } from './pub/checkout/summary-checkout/summary-checkout.module';
import { PendingDetailPageModule } from './pub/order/pending/pending-detail/pending-detail.module';
import { BuktiTfPageModule } from './pub/order/pending/bukti-tf/bukti-tf.module';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { BuktiTfKirimPageModule } from './pub/order/kirim/bukti-tf-kirim/bukti-tf-kirim.module';
import { FCM } from '@ionic-native/fcm/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
              BrowserModule, 
              IonicModule.forRoot(), 
              AppRoutingModule,
              IonicStorageModule.forRoot(),
              HttpClientModule,
              IonBottomDrawerModule,
              CartAddPageModule,
              SidemAccountPageModule,
              PopCartPageModule,
              SummaryCheckoutPageModule,
              PendingDetailPageModule,
              BuktiTfPageModule,
              BuktiTfKirimPageModule
            ],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    HTTP,
    AndroidPermissions,
    Geolocation,
    NativeGeocoder,
    Camera,
    ImagePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
