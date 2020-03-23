import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RekeningDetailPageRoutingModule } from './rekening-detail-routing.module';

import { RekeningDetailPage } from './rekening-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RekeningDetailPageRoutingModule
  ],
  declarations: [RekeningDetailPage]
})
export class RekeningDetailPageModule {}
