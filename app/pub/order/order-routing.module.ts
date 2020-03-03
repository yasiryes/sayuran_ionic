import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderPage}  from './order.page';
// { path: 'pending', loadChildren: './pending/pending.module#PendingPageModule' },
// { path: 'proses', loadChildren: './proses/proses.module#ProsesPageModule' },
// { path: 'kirim', loadChildren: './kirim/kirim.module#KirimPageModule' },
const routes: Routes = [
  {
    path: 'orders',
    component: OrderPage,
    children:[
        { path: 'pending', loadChildren: './pending/pending.module#PendingPageModule' },
        { path: 'proses', loadChildren: './proses/proses.module#ProsesPageModule' },
        { path: 'kirim', loadChildren: './kirim/kirim.module#KirimPageModule' },
        {
          path: '',
          redirectTo: '/pub/tabs/order/orders/pending',
          pathMatch: 'full'
        }
      ]
  },
  {
    path: '',
    redirectTo: '/pub/tabs/order/orders/pending',
    pathMatch: 'full'
  }

];

@NgModule({
  imports:
    [
      RouterModule.forChild(routes)
    ],
  exports:
    [
      RouterModule
    ]
})
export class OrderRoutingModule {}