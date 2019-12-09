import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, Events } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  @ViewChild('tabs', {static: true}) tabs : IonTabs;

  cariVal: string;
  constructor(public event: Events) { 
  }

  ngOnInit() {
  }
  
  selectCariProdukTab(){
    console.log('called the focus search function >>');
    console.log(this.cariVal);
    this.tabs.select('cari_produk');

    this.event.publish('produk:cari', this.cariVal);
  }
}
