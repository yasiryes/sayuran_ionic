import { Component, OnInit, ViewChild, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DrawerState, IonBottomDrawerModule } from 'ion-bottom-drawer';
import { IonContent, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
    private api: ApiService,
    private auth: AuthenticationService,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.load_kategori();
    this.load_produks();
  }

  reloadRefresh(event){
    this.load_kategori();
    this.load_produks();
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }
  get_content_element(){
    return document.querySelector('#content');
  }

  load_produks(){
    this.api.doGet('produk/kat/?id=' + this.id).subscribe(
      (data) => {
        console.log('isi produk kategori >>');
        console.log(data);
        this.produks = data;
      }
    )
  }
  load_selected_produk(id){
    this.auth.getToken().then(
      (resu_get_token) => {
        console.log('this.load_selected_produk token >>');
        console.log(resu_get_token);
        this.auth.get_no_hp().then(
          (resu_get_no_hp) => {
            this.api.doGet('produk/one/?id=' + id + '&no_hp=' + resu_get_no_hp + '&token='+resu_get_token).subscribe(
              (data) => {
                this.selected_produk = data;
              }
            )
          }
        )
      }
    );
  }
  load_kategori(){
    this.api.doGet('kategori_one/?id=' + this.id).subscribe(
      (data) => {
        this.kategori = data;
      }
    )
  }
  goto_produk_det(id){
    this.navCtrl.navigateForward('produk-det/' + id);
  }
}
