import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './resolver/data-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'pub', pathMatch: 'full' },
  { path: 'login', loadChildren: './acc/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './acc/register/register.module#RegisterPageModule' },

  { path: 'pub', loadChildren: './pub/tabs/tabs.module#TabsPageModule' },
  { path: 'cart', loadChildren: './pub/cart/cart.module#CartPageModule' },
  { 
    path: 'produk-det/:id', 
    resolve: {
      special: DataResolverService
    },
    loadChildren: './pub/produk-det/produk-det.module#ProdukDetPageModule' 
  },
  {
    path: 'email-verify',
    loadChildren: () => import('./pub/email-verify/email-verify.module').then( m => m.EmailVerifyPageModule)
  },
  {
    path: 'promo-det/:id',
    loadChildren: () => import('./pub/promo-det/promo-det.module').then( m => m.PromoDetPageModule)
  },
  {
    path: 'kategori-det/:id',
    loadChildren: () => import('./pub/kategori-det/kategori-det.module').then( m => m.KategoriDetPageModule)
  },  {
    path: 'cart-add',
    loadChildren: () => import('./pub/cart-add/cart-add.module').then( m => m.CartAddPageModule)
  },


  // { path: 'sidem-account', loadChildren: './pub/account/sidem-account/sidem-account.module#SidemAccountPageModule' },

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
