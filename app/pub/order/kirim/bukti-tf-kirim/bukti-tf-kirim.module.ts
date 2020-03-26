import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuktiTfKirimPageRoutingModule } from './bukti-tf-kirim-routing.module';

import { BuktiTfKirimPage } from './bukti-tf-kirim.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuktiTfKirimPageRoutingModule
  ],
  declarations: [BuktiTfKirimPage]
})
export class BuktiTfKirimPageModule {}
