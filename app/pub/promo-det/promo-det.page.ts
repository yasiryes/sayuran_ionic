import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EnvService } from 'src/app/services/env.service';

@Component({
  selector: 'app-promo-det',
  templateUrl: './promo-det.page.html',
  styleUrls: ['./promo-det.page.scss'],
})
export class PromoDetPage implements OnInit {
  id: string;
  promo = {};

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {

   }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.load_detail_promo(this.id);
  }

  load_detail_promo(id){
    this.api.doGet('promo/one/?id=' + id).subscribe(
      (data) => {
        this.promo = data;
      }
    )
  }
}
