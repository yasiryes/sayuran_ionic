import { Component, OnInit, ViewChild, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DrawerState, IonBottomDrawerModule } from 'ion-bottom-drawer';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-kategori-det',
  templateUrl: './kategori-det.page.html',
  styleUrls: ['./kategori-det.page.scss'],
})
export class KategoriDetPage implements OnInit {
  id: string;
  produk = {}
  produks: any;

  selected_produk = {};

  kategori = {}

  brightnessVal = 100

  shouldBounce = true;
  dockedHeight = 250;
  distanceTop = 56;
  drawerState = DrawerState.Bottom;
  states = DrawerState;
  minimumHeight = 0;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.load_kategori();
    this.load_produks();
  }

  get_content_element(){
    return document.querySelector('#content');
  }

  load_produks(){
    this.api.doGet('produk/kat/?id=' + this.id).subscribe(
      (data) => {
        this.produks = data;
      }
    )
  }
  load_selected_produk(id){
    this.api.doGet('produk/one/?id=' + id).subscribe(
      (data) => {
        this.selected_produk = data;
      }
    )
  }
  load_kategori(){
    this.api.doGet('kategori_one/?id=' + this.id).subscribe(
      (data) => {
        this.kategori = data;
      }
    )
  }

  drop_drawer(){
    this.get_content_element().setAttribute('style', 'filter: brightness(100%)');
    this.drawerState = DrawerState.Bottom;
  }
  pop_cart_input(id, is_parent){
    console.log(id);
    if (id == undefined && is_parent){
      this.get_content_element().setAttribute('style', 'filter: brightness(100%)');
      this.drawerState = DrawerState.Bottom;
      // return;
    } else if (this.drawerState == DrawerState.Docked && is_parent == false){
      this.get_content_element().setAttribute('style', 'filter: brightness(100%)');
      this.drawerState = DrawerState.Bottom;
      // return;
    }else if (this.drawerState == DrawerState.Bottom && is_parent == false) {

      this.load_selected_produk(id);

      this.drawerState = DrawerState.Docked;
      this.get_content_element().setAttribute('style', 'filter: brightness(60%)');
    }

  }
  on_change_drawer_produk(event){
    if(event == 0){
      this.get_content_element().setAttribute('style', 'filter: brightness(100%)');
    }
  }
}
