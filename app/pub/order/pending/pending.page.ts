import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ApiService } from 'src/app/services/api.service';
import { KagetService } from 'src/app/services/kaget.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.page.html',
  styleUrls: ['./pending.page.scss'],
})
export class PendingPage implements OnInit {
  penjualan_datas: any;
  penjualand_datas: any;

  is_show_detail: boolean;

  tes: number = 3000;
  tes_str: string;

  too_l: ToolsService;

  constructor(
    private auth: AuthenticationService,
    private api: ApiService,
    private kaget: KagetService,
    public tool: ToolsService
  ) {
    this.is_show_detail = false;
    this.load_penjualan();
    // this.load_penjualand()
    this.tes_str = this.tes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  ngOnInit() {
  }

  togle_detail(){
    this.is_show_detail = !this.is_show_detail;
  }

  load_penjualan(){
    this.auth.getToken().then(
      (resu_get_token) => {
        this.auth.get_no_hp().then(
          (resu_get_no_hp) => {
            this.api.doGet('sell/order_pending_get/' + resu_get_token + '/' + resu_get_no_hp + '/').subscribe(
              (resu_get_penjualan) => {
                if (resu_get_penjualan['status'] == 1){
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
