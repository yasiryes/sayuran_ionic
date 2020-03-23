import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuktiTfPage } from './bukti-tf.page';

const routes: Routes = [
  {
    path: '',
    component: BuktiTfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuktiTfPageRoutingModule {}
