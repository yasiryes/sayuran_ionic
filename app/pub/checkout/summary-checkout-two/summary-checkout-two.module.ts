import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SummaryCheckoutTwoPageRoutingModule } from './summary-checkout-two-routing.module';

import { SummaryCheckoutTwoPage } from './summary-checkout-two.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SummaryCheckoutTwoPageRoutingModule
  ],
  declarations: [SummaryCheckoutTwoPage]
})
export class SummaryCheckoutTwoPageModule {}
