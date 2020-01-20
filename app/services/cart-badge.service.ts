import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
// import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CartBadgeService {

  cart_count = new BehaviorSubject<number>(0);

  constructor(
    private api: ApiService,
    // private auth: AuthenticationService
  ) { }

  set_count(val){
    this.cart_count.next(val);
  }

  do_update(){
    // this.auth.getToken().then(
    //   (data) => {
    //     this.api.doGet('cart_count/'+ data +'/').subscribe(
    //       (data) => {
    //         this.cart_count.next(data['count']);
    //       }
    //     )

    //   }
    // )
  }
}
