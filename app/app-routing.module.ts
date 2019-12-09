import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'pub', pathMatch: 'full' },
  { path: 'login', loadChildren: './acc/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './acc/register/register.module#RegisterPageModule' },

  { path: 'pub', loadChildren: './pub/tabs/tabs.module#TabsPageModule' },
  { path: 'cart', loadChildren: './pub/cart/cart.module#CartPageModule' },
  { path: 'produk-det', loadChildren: './pub/produk-det/produk-det.module#ProdukDetPageModule' },
  // {
  //   path: 'cari-produk',
  //   loadChildren: () => import('./pub/cari-produk/cari-produk.module').then( m => m.CariProdukPageModule)
  // }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
