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
              SummaryCheckoutPageModule
            ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    AndroidPermissions,
    Geolocation,
    NativeGeocoder,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
