import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './resolver/data-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'pub', pathMatch: 'full' },
  { path: 'login', loadChildren: './acc/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './acc/register/register.module#RegisterPageModule' },

  { path: 'pub', loadChildren: './pub/tabs/tabs.module#TabsPageModule' },
  // { path: 'order', loadChildren: './pub/order/order.module#OrderPageModule' },
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
  },
  {
    path: 'cart-add',
    loadChildren: () => import('./pub/cart-add/cart-add.module').then( m => m.CartAddPageModule)
  },
  {
    path: 'sms-verify/:no_hp',
    loadChildren: () => import('./pub/sms-verify/sms-verify.module').then( m => m.SmsVerifyPageModule)
  },  { path: 'checkout', loadChildren: './pub/checkout/checkout.module#CheckoutPageModule' },
  {
    path: 'summary-checkout',
    loadChildren: () => import('./pub/checkout/summary-checkout/summary-checkout.module').then( m => m.SummaryCheckoutPageModule)
  },
  {
    path: 'summary-checkout-two',
    loadChildren: () => import('./pub/checkout/summary-checkout-two/summary-checkout-two.module').then( m => m.SummaryCheckoutTwoPageModule)
  },
  {
    path: 'ubah-detail',
    loadChildren: () => import('./pub/account/ubah-detail/ubah-detail.module').then( m => m.UbahDetailPageModule)
  },
  {
    path: 'edit-profil',
    loadChildren: () => import('./pub/edit-profil/edit-profil.module').then( m => m.EditProfilPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
