import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingDetailPageRoutingModule } from './pending-detail-routing.module';

import { PendingDetailPage } from './pending-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingDetailPageRoutingModule
  ],
  declarations: [PendingDetailPage]
})
export class PendingDetailPageModule {}
