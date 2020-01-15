import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KategoriDetPage } from './kategori-det.page';

const routes: Routes = [
  {
    path: '',
    component: KategoriDetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KategoriDetPageRoutingModule {}
