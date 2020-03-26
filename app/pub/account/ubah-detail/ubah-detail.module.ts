import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbahDetailPageRoutingModule } from './ubah-detail-routing.module';

import { UbahDetailPage } from './ubah-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UbahDetailPageRoutingModule
  ],
  declarations: [UbahDetailPage]
})
export class UbahDetailPageModule {}
