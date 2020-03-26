import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryCheckoutTwoPage } from './summary-checkout-two.page';

const routes: Routes = [
  {
    path: '',
    component: SummaryCheckoutTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummaryCheckoutTwoPageRoutingModule {}
