import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-add',
  templateUrl: './cart-add.page.html',
  styleUrls: ['./cart-add.page.scss'],
})
export class CartAddPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(document.querySelector('.popover-wrapper'));
    document.querySelector('.popover-wrapper').animate;
    // document.querySelector('.popover-wrapper').setAttribute('style', 'position: absolute; top: 300px; bottom: 0px; left: 0px;');
  }

}
