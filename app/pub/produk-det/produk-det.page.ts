import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-produk-det',
  templateUrl: './produk-det.page.html',
  styleUrls: ['./produk-det.page.scss'],
})
export class ProdukDetPage implements OnInit {
  id: string;
  produkData = {};
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private env: EnvService,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    console.log(this.id);
    this.loadProduk(this.id)
  }

  loadProduk(id){
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    this.http.get(this.env.API_URL + 'produk/one/?id=' + id, { headers: headers }).subscribe(
      res => {
        console.log('isi result >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        var produk = res;
        if (produk['keterangan'] == null){
          produk['keterangan'] = '-';
        }
        this.produkData = produk;
        // console.log("Success : " + this.produkDatas);
      },
      errornya => {

      },
      () => {
        console.log(console.log('selesai manggil nya >>>>>>>>>>>>>'));
      }
    )
    // );
    console.log('after calling get produk >>>>>>>>>>>>>>>>>>>>');
  }

}
