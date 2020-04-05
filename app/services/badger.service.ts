import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthenticationService } from './authentication.service';
import { Events } from '@ionic/angular';
import { KagetService } from './kaget.service';
import { onErrorResumeNextStatic } from 'rxjs/internal/operators/onErrorResumeNext';

@Injectable({
  providedIn: 'root'
})
export class BadgerService {

  constructor(
    private api: ApiService,
    private auth: AuthenticationService,
    public events: Events,
    public kaget: KagetService,
    ) {

  }

  broadcast_cart_badge(){
    this.auth.getToken().then(
      (resu_get_token) => {
        this.auth.get_no_hp().then(
          (resu_get_no_hp) => {
            this.api.doGet('cart_count/' + resu_get_token + '/' + resu_get_no_hp + '/').subscribe(
              (resu_get_cart_count) => {
                if (resu_get_cart_count['status'] == 1){
                  this.events.publish('cart_badge:updated', resu_get_cart_count['count']);
                }else{
                  this.kaget.show_ok_dialog(resu_get_cart_count['message']);
                  this.auth.set_logged_out();
                }
              }
            )
          },
          (err_get_no_hp) => {

          }
        )
      },
      (err_get_token) => {

      }
    )
  }  
  broadcast_order_badge(){
    this.auth.getToken().then(
      (resu_get_token) => {
        this.auth.get_no_hp().then(
          (resu_get_no_hp) => {
            this.api.doGet('order_count/' + resu_get_token + '/' + resu_get_no_hp + '/').subscribe(
              (resu_get_order_count) => {
                if (resu_get_order_count['status'] == 1){
                  this.events.publish('order_badge:updated', resu_get_order_count['count']);
                }else{
                  this.kaget.show_ok_dialog(resu_get_order_count['message']);
                  this.auth.set_logged_out();
                }
              }
            )
          },
          (err_get_no_hp) => {

          }
        )
      },
      (err_get_token) => {

      }
    )
  }
}
