import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, Events } from '@ionic/angular';
import {Platform} from '@ionic/angular';
import { CartBadgeService } from 'src/app/services/cart-badge.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  @ViewChild('tabs', {static: true}) tabs : IonTabs;
  subscribe: any;
  cariVal: string;
  isShowSearch: boolean;

  cart_badge_val: number = 0;

  constructor(
    public event: Events, 
    public platform: Platform,
    private cart_badge: CartBadgeService
    ) { 
    this.isShowSearch = true;
    this.cart_badge.cart_count.subscribe(
      (data) => {
        this.cart_badge_val = data;
      }
    )
  }

  ngOnInit() {
  }

  changedTab(){
    console.log('changedTab >>>>>>>>>>>>>>>>>>>');
    console.log(this.tabs.getSelected());
    var selectedTab = this.tabs.getSelected();
    if (selectedTab == 'dashboard' || selectedTab == 'cari_produk'){
      console.log('change tab -> dashboard / cari_produk True');
      this.isShowSearch = true
    }else{
      this.isShowSearch = false;
    }
  }
  
  selectCariProdukTab(){
    console.log('called the focus search function >>');
    console.log(this.cariVal);
    // this.tabs.select('cari_produk');

    // this.event.publish('produk:cari', this.cariVal);
  }
}
