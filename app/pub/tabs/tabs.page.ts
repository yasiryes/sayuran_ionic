import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, Events } from '@ionic/angular';
import {Platform} from '@ionic/angular';

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
  constructor(public event: Events, public platform: Platform) { 
    this.isShowSearch = true;

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
