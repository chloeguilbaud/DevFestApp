import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Sessions } from '../../providers';
import { Session } from '../../entities/session';
import { SessionsHandler } from '../../manager/session/session';

@IonicPage()
@Component({
  selector: 'session-page',
  templateUrl: 'session.html'
})
export class SessionPage {
  session: Session;

  constructor(public navCtrl: NavController, navParams: NavParams, public sessionsHandler: SessionsHandler, conferences: Sessions) {
    // Get session given in parameter from previous page
    this.session = navParams.get('session');
    // Request given session from API
    sessionsHandler.getSession(this.session.id).then((response: Session) => {
      this.session = response;
    });
  }

  /**
   * Open Presentateur page with given Presentateur
   * 
   * @param presentateur Presentateur
   */
  openItem(presentateur: any) {
    this.navCtrl.push('PresentateurPage', {
      presentateur: presentateur
    });
  }

}
