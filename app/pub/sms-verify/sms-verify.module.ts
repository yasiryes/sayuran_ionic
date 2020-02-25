import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmsVerifyPageRoutingModule } from './sms-verify-routing.module';

import { SmsVerifyPage } from './sms-verify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmsVerifyPageRoutingModule
  ],
  declarations: [SmsVerifyPage]
})
export class SmsVerifyPageModule {}
