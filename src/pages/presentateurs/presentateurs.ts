import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Presentateur } from '../../entities/presentateur';
import { PresentateursHandler } from '../../manager/presentateur/presentateur';
import { ErrorAlertHandler } from '../../manager/error.handler/error.alert.handler';

@Component({
  selector: 'page-presentateurs',
  templateUrl: 'presentateurs.html'
})
export class PresentateursPage {

  presentateurs: Presentateur[];

  constructor(public navCtrl: NavController,
              public presentatateurHandler: PresentateursHandler,
              public alertHandler: ErrorAlertHandler) {
    this.presentateurs = [];
    // Request all presentateurs
    presentatateurHandler.query().then((response: Presentateur[]) => {
      this.presentateurs = response;
    }).catch((err) => {
      this.alertHandler.presentAlert("Aie", "Impossible de récupérer les présentateurs", "Ok");
    });
  }

  /**
   * Open Presentateur page with given Presentateur
   * 
   * @param presentateur Presentateur
   */
  openItem(presentateur: Presentateur) {
    this.navCtrl.push('PresentateurPage', {
      presentateur: presentateur
    });
  }

}
