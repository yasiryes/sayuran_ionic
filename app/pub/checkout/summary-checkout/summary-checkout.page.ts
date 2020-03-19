import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { 
  }

  ngOnInit() {
  }

}
