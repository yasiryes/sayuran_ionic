import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SummaryCheckoutPageRoutingModule } from './summary-checkout-routing.module';

import { SummaryCheckoutPage } from './summary-checkout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SummaryCheckoutPageRoutingModule
  ],
  declarations: [SummaryCheckoutPage]
})
export class SummaryCheckoutPageModule {}
