import { Component, OnInit } from '@angular/core';
import { BadgerService } from 'src/app/services/badger.service';

@Component({
  selector: 'app-proses',
  templateUrl: './proses.page.html',
  styleUrls: ['./proses.page.scss'],
})
export class ProsesPage implements OnInit {

  constructor(
    public badger: BadgerService
  ) { 
    this.badger.broadcast_order_badge();
  }

  ngOnInit() {
  }

}
