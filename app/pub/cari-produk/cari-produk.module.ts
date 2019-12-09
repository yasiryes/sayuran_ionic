import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CariProdukPageRoutingModule } from './cari-produk-routing.module';

import { CariProdukPage } from './cari-produk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CariProdukPageRoutingModule
  ],
  declarations: [CariProdukPage]
})
export class CariProdukPageModule {}
