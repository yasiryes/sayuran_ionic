import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuktiTfKirimPage } from './bukti-tf-kirim.page';

const routes: Routes = [
  {
    path: '',
    component: BuktiTfKirimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuktiTfKirimPageRoutingModule {}
