import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ApiService } from 'src/app/services/api.service';
import { KagetService } from 'src/app/services/kaget.service';
import { ToolsService } from 'src/app/services/tools.service';
import { PopoverController, ModalController, Events } from '@ionic/angular';
import { BuktiTfKirimPage } from './bukti-tf-kirim/bukti-tf-kirim.page';

@Component({
  selector: 'app-kirim',
  templateUrl: './kirim.page.html',
  styleUrls: ['./kirim.page.scss'],
})
export class KirimPage implements OnInit {
  penjualan_datas: any;

  constructor(
    private auth: AuthenticationService,
    private api: ApiService,
    private kaget: KagetService,
    public tool: ToolsService,
    public pop_controller: PopoverController,
    public modal_controller: ModalController,
    public events: Events
  ) { 
    events.subscribe('selesai:updated', 
      () => {
        // this.is_show_detail = false;
        this.load_penjualan();
        // this.load_promos();
        // this.load_penjualand()
        // this.tes_str = this.tes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    );
    this.load_penjualan();
  }

  ngOnInit() {
  }
  async show_bukti_tf(id) {
    console.log('show_bukti_tf, id >>');
    console.log(id);
    const modal = await this.modal_controller.create({
      component: BuktiTfKirimPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        penjualan_id: id
      }
    });
    return await modal.present();
  }
  toggle_detail(id){
    console.log('masuk toggle_detail >.');
    console.log(id);
    const ele_id = 'detail_' + id.toString();
    var ele = document.getElementById(ele_id);
    console.log(ele);
    ele.style.setProperty('display', 'block');
  }
  load_penjualan(){
    this.auth.getToken().then(
      (resu_get_token) => {
        this.auth.get_no_hp().then(
          (resu_get_no_hp) => {
            this.api.doGet('sell/order_selesai_get/' + resu_get_token + '/' + resu_get_no_hp + '/').subscribe(
              (resu_get_penjualan) => {
                if (resu_get_penjualan['status'] == 1){
                  console.log('get_penjualan >>');
                  console.log(resu_get_penjualan);

                  this.penjualan_datas = resu_get_penjualan['data']
                }else{
                  this.auth.set_logged_out();
                  this.kaget.show_ok_dialog(resu_get_penjualan['message']);
                }
              },
              (err_get_penjualan) => {

              }
            )
          },
          (err_get_no_hp) =>{
            console.log('Error getting no_hp from storage.')
            console.log(err_get_no_hp)
          }
        )
      },
      (err_get_token) => {
        console.log('Error getting token from storage.')
        console.log(err_get_token)
      }
    )
  }
}
