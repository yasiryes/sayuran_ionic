import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { KagetService } from 'src/app/services/kaget.service';
import { NavController, PopoverController, Events } from '@ionic/angular';
import { BadgerService } from 'src/app/services/badger.service';

@Component({
  selector: 'app-summary-checkout',
  templateUrl: './summary-checkout.page.html',
  styleUrls: ['./summary-checkout.page.scss'],
})
export class SummaryCheckoutPage implements OnInit {
  // 'items': this.cart_datas,
  // 'sub_total': this.subtotal_sum,
  // 'berat_kirim': this.berat_kirim_sum,
  // 'nama_kirim': this.nama_kirim.value,
  // 'hp_kirim': this.hp_kirim.value,
  // 'alamat': this.alamat.value,
  // 'alamat_info': this.alamat_info.value

  @Input() items: [];
  @Input() sub_total: number;
  @Input() berat_kirim: number;
  @Input() nama_kirim: string;
  @Input() hp_kirim: number;
  @Input() alamat: string;
  @Input() alamat_info: string;
  @Input() ongkir: number;
  @Input() jarak_kirim: number;
  @Input() total: number;
  @Input() is_tunai: boolean;
  @Input() bank_id: number;
  @Input() lat: number;
  @Input() lng: number;
  @Input() tgl_kirim: string;
  constructor(
    private api: ApiService,
    private auth: AuthenticationService,
    private kaget: KagetService,
    public navCtrl: NavController,
    public pop_controller: PopoverController,
    public badger: BadgerService,
    public events: Events
  ) { 
  }

  ngOnInit() {
  }

  save_order(){
    this.auth.getToken().then(
      (resu_get_token) => {
        this.auth.get_no_hp().then(
          (resu_get_no_hp) => {
            const new_order_data = {
              is_tunai: this.is_tunai,
              bank_id: this.bank_id,

              alamat: this.alamat,
              alamat_info: this.alamat_info,
              lat: this.lat,

              lng: this.lng,
              ongkir: this.ongkir,
              jarak_kirim: this.jarak_kirim,

              berat_kirim: this.berat_kirim,
              total_bayar: this.total,

              token: resu_get_token,
              no_hp: resu_get_no_hp,

              tgl_kirim: this.tgl_kirim
            };
            this.api.doPost('sell/order_new/', new_order_data).subscribe(
              (resu_new_order)=>{
                if(resu_new_order['status'] == 1){
                  this.kaget.show_ok_dialog('Sukses menambahkan order, lihat status order kamu di menu "Order"');
                  this.pop_controller.dismiss();
                  this.badger.broadcast_cart_badge();
                  this.badger.broadcast_order_badge();
                  
                  this.events.publish('pending:updated');

                  this.navCtrl.navigateRoot('pub/tabs/dashboard');
                }else{
                  this.kaget.show_ok_dialog(resu_new_order['message']);

                  this.auth.set_logged_out();
                }
              },
              (err_new_order) => {

              }
            )
          },
          (err_get_no_hp) =>{

          }
        )
      },
      (err_get_token) => {

      }
    )
  }
}
