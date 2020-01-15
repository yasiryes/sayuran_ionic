import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromoDetPage } from './promo-det.page';

const routes: Routes = [
  {
    path: '',
    component: PromoDetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromoDetPageRoutingModule {}
