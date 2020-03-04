import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
        {
          path: 'pop-cart',
          loadChildren: './pop-cart/pop-cart.module#PopCartPageModule'
        },
        { 
          path: 'order', 
          loadChildren: '../order/order.module#OrderPageModule' 
        },

        { 
          path: 'pending', 
          redirectTo: '/pub/tabs/order/pending',
          pathMatch: 'full'
        },
        { 
          path: 'proses', 
          redirectTo: '/pub/tabs/order/proses',
          pathMatch: 'full'
        },
        { 
          path: 'kirim', 
          redirectTo: '/pub/tabs/order/kirim',
          pathMatch: 'full'
        },

        {
          path: 'dashboard',
          loadChildren: '../dashboard/dashboard.module#DashboardPageModule'
        },
        {
          path: 'account',
          loadChildren: '../account/account.module#AccountPageModule'
        },
        {
          path: 'cart',
          loadChildren: '../cart/cart.module#CartPageModule'
        },
        {
          path: 'cari_produk',
          loadChildren: '../cari-produk/cari-produk.module#CariProdukPageModule'
        },
        {
          path: '',
          redirectTo: '/pub/tabs/dashboard',
          pathMatch: 'full'
        }
      ]
  },
  {
    path: '',
    redirectTo: '/pub/tabs/dashboard',
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
export class TabsRoutingModule {}