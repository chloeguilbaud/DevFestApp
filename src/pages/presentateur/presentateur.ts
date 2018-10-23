import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Presentateurs } from '../../providers';
import { Presentateur } from '../../entities/presentateur';
import { PresentateursHandler } from '../../manager/presentateur/presentateur';

@IonicPage()
@Component({
  selector: 'presentateur-page',
  templateUrl: 'presentateur.html'
})
export class PresentateurPage {
  presentateur: Presentateur;

  constructor(public navCtrl: NavController, navParams: NavParams, public presentateursHandler: PresentateursHandler, presentateurs: Presentateurs) {
    this.presentateur = navParams.get('presentateur');
    presentateursHandler.getPresentateur(this.presentateur.id).then((response: Presentateur) => {
      this.presentateur = response;
    });
  }

  openItem(session: any) {
    this.navCtrl.push('SessionPage', {
      session: session
    });
  }

}
