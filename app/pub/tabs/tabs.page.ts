import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, Events, PopoverController } from '@ionic/angular';
import {Platform} from '@ionic/angular';
import { PopCartPage } from './pop-cart/pop-cart.page';
import { BadgerService } from 'src/app/services/badger.service';


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
  order_badge_val: number = 0;

  constructor(
    public event: Events, 
    public platform: Platform,
    public pop_controller: PopoverController,
    public events: Events,
    private badger: BadgerService
    ) { 
    this.isShowSearch = true;
    events.subscribe('cart_badge:updated', 
      (jumlah) => {
        this.cart_badge_val = jumlah;
      }
    );
    events.subscribe('order_badge:updated', 
      (jumlah) => {
        this.order_badge_val = jumlah;
      }
    );
    // this.cart_badge.cart_count.subscribe(
    //   (data) => {
    //     this.cart_badge_val = data;
    //   }
    // )
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
    this.badger.broadcast_order_badge();
  }
  
  async show_pop() {
    const popover = await this.pop_controller.create(
        {
          animated: false,
          component: PopCartPage,
          showBackdrop: true
        }
      );
    
    return await popover.present();
  }
  selectCariProdukTab(){
    console.log('called the focus search function >>');
    console.log(this.cariVal);
    // this.tabs.select('cari_produk');

    // this.event.publish('produk:cari', this.cariVal);
  }
}
