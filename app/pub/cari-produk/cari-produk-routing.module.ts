import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CariProdukPage } from './cari-produk.page';

const routes: Routes = [
  {
    path: '',
    component: CariProdukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CariProdukPageRoutingModule {}
