import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-bukti-tf-kirim',
  templateUrl: './bukti-tf-kirim.page.html',
  styleUrls: ['./bukti-tf-kirim.page.scss'],
})
export class BuktiTfKirimPage implements OnInit {
  @Input() penjualan_id: number;

  bukti_tf: string;

  constructor(
    public modal_controller: ModalController,
    private api: ApiService,
    public events: Events
  ) {
    this.bukti_tf = '';
   }

  ngOnInit() {
    console.log('bukti_tf_page, penjualan_id >>');
    console.log(this.penjualan_id);
    this.load_bukti_tf();
  }

  load_bukti_tf(){
    this.api.doGet('sell/bukti_tf_get/' + this.penjualan_id + '/').subscribe(
      (resu_get_bukti_tf) => {
        console.log('resu_get_bukti_tf');
        console.log(resu_get_bukti_tf);
        this.bukti_tf = resu_get_bukti_tf['gambar'];
      },
      (err_get_bukti_tf) => {
        console.log('err_get_bukti_tf');
        console.log(err_get_bukti_tf);
      }
    )
  }
}
