import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { CartAddPage } from '../cart-add/cart-add.page';
import { CartAddPageModule } from '../cart-add/cart-add.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    IonBottomDrawerModule,
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
