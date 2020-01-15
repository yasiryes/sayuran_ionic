import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromoDetPageRoutingModule } from './promo-det-routing.module';

import { PromoDetPage } from './promo-det.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromoDetPageRoutingModule
  ],
  declarations: [PromoDetPage]
})
export class PromoDetPageModule {}
