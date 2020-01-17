import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartAddPage } from './cart-add.page';

const routes: Routes = [
  {
    path: '',
    component: CartAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartAddPageRoutingModule {}
