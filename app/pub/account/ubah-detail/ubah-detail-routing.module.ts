import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UbahDetailPage } from './ubah-detail.page';

const routes: Routes = [
  {
    path: '',
    component: UbahDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UbahDetailPageRoutingModule {}
