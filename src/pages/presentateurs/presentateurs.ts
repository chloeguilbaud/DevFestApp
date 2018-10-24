import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Presentateur } from '../../entities/presentateur';
import { Session } from '../../entities/session';
import { PresentateursHandler } from '../../manager/presentateur/presentateur';

@Component({
  selector: 'page-presentateurs',
  templateUrl: 'presentateurs.html'
})
export class PresentateursPage {

  presentateurs: Presentateur[];

  constructor(public navCtrl: NavController, public presentatateurHandler: PresentateursHandler) {
    this.presentateurs = [];
    // Request all presentateurs
    presentatateurHandler.query().then((response: Presentateur[]) => {
      this.presentateurs = response;
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
