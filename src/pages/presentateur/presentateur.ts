import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Presentateurs } from '../../providers';
import { Presentateur } from '../../entities/presentateur';
import { Session } from '../../entities/session';

@IonicPage()
@Component({
  selector: 'presentateur-page',
  templateUrl: 'presentateur.html'
})
export class PresentateurPage {
  presentateur: Presentateur;

  constructor(public navCtrl: NavController, navParams: NavParams, presentateurs: Presentateurs) {
    this.presentateur = navParams.get('presentateur');
    // TODO: this.presentateurs.get(presentateur);
    // Mock:
    // this.presentateur = new Presentateur('Lagaff', 'Vincent', [new Session('J\'ai un beau crâne')]);
    // EndMock
  }

  openItem(session: any) {
    this.navCtrl.push('SessionPage', {
      session: session
    });
  }

}
