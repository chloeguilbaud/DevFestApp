import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Sessions } from '../../providers';
import { Session } from '../../entities/session';
import { SessionsHandler } from '../../manager/session/session';
import { ErrorAlertHandler } from '../../manager/error.handler/error.alert.handler';

@IonicPage()
@Component({
  selector: 'session-page',
  templateUrl: 'session.html'
})
export class SessionPage {
  session: Session;

  constructor(public navCtrl: NavController,
              navParams: NavParams,
              public sessionsHandler: SessionsHandler,
              public alertHandler: ErrorAlertHandler) {
    // Get session given in parameter from previous page
    this.session = navParams.get('session');
    // Request given session from API
    sessionsHandler.getSession(this.session.id).then((response: Session) => {
      this.session = response;
    }).catch((err) => {
      this.alertHandler.presentAlert("Aie", "Impossible de récupérer la session", "Ok");
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
