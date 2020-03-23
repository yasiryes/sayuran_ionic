import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ApiService } from 'src/app/services/api.service';
import { KagetService } from 'src/app/services/kaget.service';
import { ToolsService } from 'src/app/services/tools.service';
import { PopoverController, ModalController, Events } from '@ionic/angular';
import { PendingDetailPage } from './pending-detail/pending-detail.page';
import { BuktiTfPage } from './bukti-tf/bukti-tf.page';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.page.html',
  styleUrls: ['./pending.page.scss'],
})
export class PendingPage implements OnInit {
  penjualan_datas: any;
  penjualand_datas: any;
  
  promos: any;

  is_show_detail: boolean;

  tes: number = 3000;
  tes_str: string;

  too_l: ToolsService;

  constructor(
    private auth: AuthenticationService,
    private api: ApiService,
    private kaget: KagetService,
    public tool: ToolsService,
    public pop_controller: PopoverController,
    public modal_controller: ModalController,
    public events: Events
  ) {

    events.subscribe('pending:updated', 
      () => {
        this.is_show_detail = false;
        this.load_penjualan();
        // this.load_promos();
        // this.load_penjualand()
        this.tes_str = this.tes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    );

    this.is_show_detail = false;
    this.load_penjualan();
    // this.load_promos();
    // this.load_penjualand()
    this.tes_str = this.tes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  ngOnInit() {
  }

  toggle_detail(id){
    const ele_id = 'detail_' + id.toString();
    document.getElementById(ele_id).style.setProperty('display', 'block');
  }
  load_promos(){
    this.api.doGet('promo/all/').subscribe(
      (data) => {
        this.promos = data;
      }
    ) 
  }
  async show_bukti_tf(id) {
    console.log('show_bukti_tf, id >>');
    console.log(id);
    const modal = await this.modal_controller.create({
      component: BuktiTfPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        penjualan_id: id
      }
    });
    return await modal.present();
  }
  async show_detail_pending(id_penjualan){
    
    const popover = await this.pop_controller.create({
      component: PendingDetailPage,
      // event: ev,
      translucent: true,
      componentProps: {
        'id_penjualan': id_penjualan
      }
    });
    
    return await popover.present();
  }
  load_penjualan(){
    this.auth.getToken().then(
      (resu_get_token) => {
        this.auth.get_no_hp().then(
          (resu_get_no_hp) => {
            this.api.doGet('sell/order_pending_get/' + resu_get_token + '/' + resu_get_no_hp + '/').subscribe(
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
  load_penjualand(id){
    this.auth.getToken().then(
      (resu_get_token) => {
        this.auth.get_no_hp().then(
          (resu_get_no_hp) => {
            this.api.doGet('sell/order_pending_get/?token=' + resu_get_token + '&no_hp=' + resu_get_no_hp + '&penjualan_id=' + id).subscribe(
              (resu_get_penjualand) => {
                if (resu_get_penjualand['status'] == 1){
                  this.penjualand_datas = resu_get_penjualand['data']
                }else{
                  this.auth.set_logged_out();
                  this.kaget.show_ok_dialog(resu_get_penjualand['message']);
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
