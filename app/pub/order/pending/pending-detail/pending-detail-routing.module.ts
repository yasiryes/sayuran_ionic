import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendingDetailPage } from './pending-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PendingDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingDetailPageRoutingModule {}
