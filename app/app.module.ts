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
            ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
