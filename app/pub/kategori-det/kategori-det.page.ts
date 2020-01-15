import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DrawerState } from 'ion-bottom-drawer';

@Component({
  selector: 'app-kategori-det',
  templateUrl: './kategori-det.page.html',
  styleUrls: ['./kategori-det.page.scss'],
})
export class KategoriDetPage implements OnInit {
  id: string;
  produks: any;
  kategori = {}

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

  load_produks(){
    this.api.doGet('produk/kat/?id=' + this.id).subscribe(
      (data) => {
        this.produks = data;
        console.log('passed produks >');
        console.log(this.produks);
      }
    )
  }
  load_kategori(){
    this.api.doGet('kategori_one/?id=' + this.id).subscribe(
      (data) => {
        this.kategori = data;
        console.log('passed kategori >')
        console.log(this.kategori);
      }
    )
  }
  pop_cart_input(){
    this.drawerState = DrawerState.Docked;
  }
}
