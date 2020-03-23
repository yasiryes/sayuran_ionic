import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RekeningDetailPage } from './rekening-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RekeningDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RekeningDetailPageRoutingModule {}
