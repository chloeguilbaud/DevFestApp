import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Sessions } from '../../providers';
import { Session } from '../../entities/session';
import { Presentateur } from '../../entities/presentateur';
import { SessionsHandler } from '../../manager/session/session';

@IonicPage()
@Component({
  selector: 'session-page',
  templateUrl: 'session.html'
})
export class SessionPage {
  session: Session;

  constructor(public navCtrl: NavController, navParams: NavParams, public sessionsHandler: SessionsHandler, conferences: Sessions) {
    this.session = navParams.get('session');
    sessionsHandler.getSession(this.session.id).then((response: Session) => {
      this.session = response;
    });
  }

  openItem(presentateur: any) {
    this.navCtrl.push('PresentateurPage', {
      presentateur: presentateur
    });
  }

}
