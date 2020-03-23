import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { KagetService } from 'src/app/services/kaget.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-pending-detail',
  templateUrl: './pending-detail.page.html',
  styleUrls: ['./pending-detail.page.scss'],
})
export class PendingDetailPage implements OnInit {

  penjualan_data = {detail: []};

  @Input() id_penjualan: number;

  constructor(
    private api: ApiService,
    private auth: AuthenticationService,
    private kaget: KagetService,
    public pop_controller: PopoverController,
    ) {
      this.load_penjualan();
    }

  ngOnInit() {
  }

  click_ok_detail(){
    this.pop_controller.dismiss();
  }
  load_penjualan(){
    this.auth.getToken().then(
      (resu_get_token) => {
        this.auth.get_no_hp().then(
          (resu_get_no_hp) => {
            this.api.doGet('sell/order_pending_get/' + resu_get_token + '/' + resu_get_no_hp + '/?id=' + this.id_penjualan).subscribe(
              (resu_get_penjualand) => {
                if (resu_get_penjualand['status'] == 1){
                  this.penjualan_data = resu_get_penjualand['data']
                  console.log('isi penjualan data >>');
                  console.log(this.penjualan_data);
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
