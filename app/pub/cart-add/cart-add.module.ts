import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartAddPageRoutingModule } from './cart-add-routing.module';

import { CartAddPage } from './cart-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartAddPageRoutingModule
  ],
  declarations: [CartAddPage]
})
export class CartAddPageModule {}
