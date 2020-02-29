import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-sidem-account',
  templateUrl: './sidem-account.page.html',
  styleUrls: ['./sidem-account.page.scss'],
})
export class SidemAccountPage implements OnInit {
  is_logged_in: boolean;
  constructor(
    private auth: AuthenticationService,
    public popController: PopoverController,
  ) {
    this.auth.getToken().then((token) => {
      this.is_logged_in = token && token != undefined;
    })
   }

  ngOnInit() {
  }

  clickLogout(){
    console.log('click logout >');
    this.auth.getToken().then(
      (get_token_resu) => {
        this.auth.get_no_hp().then(
          (get_no_hp_resu) => {
            this.auth.logout(get_token_resu, get_no_hp_resu).subscribe( 
              (data) => {
                if (this.popController.getTop()) {
                  this.popController.dismiss()
                };
                this.auth.set_logged_out();
              },
              (err_logout) => {
    
              }
            );
          },
          (get_no_hp_err) => {

          }
        )
      }
    )
  }
}
