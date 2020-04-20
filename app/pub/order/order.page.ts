import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, Events } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  @ViewChild('tabs_order', {static: true}) tabs_order : IonTabs;

  constructor(
    public events: Events,
    ) { }

  ngOnInit() {
  }

  changedTab(){
    console.log('changedTab >>>>>>>>>>>>>>>>>>>');
    console.log(this.tabs_order.getSelected());
    var selectedTab = this.tabs_order.getSelected();
    console.log('tab order change >>');
    console.log(selectedTab);
    
    // if (selectedTab == 'cari_produk') {
    //   this.events.publish('updated:seen');
    // }


    if (selectedTab == 'pending') {
      this.events.publish('pending:updated');
    }
    if (selectedTab == 'kirim') {
      this.events.publish('selesai:updated');
    }
  }
}
