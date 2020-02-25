import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmsVerifyPage } from './sms-verify.page';

const routes: Routes = [
  {
    path: '',
    component: SmsVerifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsVerifyPageRoutingModule {}
