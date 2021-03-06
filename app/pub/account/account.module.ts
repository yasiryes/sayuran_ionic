import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountPage } from './account.page';

const routes: Routes = [
  {
    path: 'account',
    component: AccountPage,
    children: [
      { 
        path: 'sidem-account', 
        loadChildren: './sidem-account/sidem-account.module#SidemAccountPageModule' 
      }
    ]
  },
  {
    path: '',
    redirectTo: '/pub/tabs/account/account'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AccountPage]
})
export class AccountPageModule {}
