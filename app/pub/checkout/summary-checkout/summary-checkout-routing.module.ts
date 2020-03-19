import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryCheckoutPage } from './summary-checkout.page';

const routes: Routes = [
  {
    path: '',
    component: SummaryCheckoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummaryCheckoutPageRoutingModule {}
