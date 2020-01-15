import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KategoriDetPageRoutingModule } from './kategori-det-routing.module';

import { KategoriDetPage } from './kategori-det.page';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KategoriDetPageRoutingModule,
    IonBottomDrawerModule
  ],
  declarations: [KategoriDetPage]
})
export class KategoriDetPageModule {}
