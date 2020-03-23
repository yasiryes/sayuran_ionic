import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuktiTfPageRoutingModule } from './bukti-tf-routing.module';

import { BuktiTfPage } from './bukti-tf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuktiTfPageRoutingModule
  ],
  declarations: [BuktiTfPage]
})
export class BuktiTfPageModule {}
