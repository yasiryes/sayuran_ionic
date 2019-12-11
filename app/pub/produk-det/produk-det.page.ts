import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produk-det',
  templateUrl: './produk-det.page.html',
  styleUrls: ['./produk-det.page.scss'],
})
export class ProdukDetPage implements OnInit {
  id: string;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
