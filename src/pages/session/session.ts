import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Sessions } from '../../providers';
import { Session } from '../../entities/session';
import { Presentateur } from '../../entities/presentateur';

@IonicPage()
@Component({
  selector: 'session-page',
  templateUrl: 'session.html'
})
export class SessionPage {
  session: Session;

  constructor(public navCtrl: NavController, navParams: NavParams, conferences: Sessions) {
    this.session = navParams.get('session');
    // TODO: this.sessions.get(session);
    // Mock:
    this.session = new Session('J\'ai un beau crâne', [new Presentateur('Lagaff', 'Vincent')]);
    // EndMock
  }

  openItem(presentateur: any) {
    this.navCtrl.push('PresentateurPage', {
      presentateur: presentateur
    });
  }

}
