import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
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