import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Session } from '../../entities/session';
import { Presentateur } from '../../entities/presentateur';
import { SessionsHandler } from '../../manager/session/session'
import { ErrorAlertHandler } from '../../manager/error.handler/error.alert.handler';

@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html'
})
export class SessionsPage {

  sessions: Session[];

  constructor(public navCtrl: NavController,
    public sessionsHandler: SessionsHandler,
    public alertHandler: ErrorAlertHandler) {
    this.sessions = [];
    // Request all sessions
    sessionsHandler.query().then((response: Session[]) => {
      this.sessions = response;
    }).catch((err) => {
      this.alertHandler.presentAlert("Aie", "Impossible de récupérer les sessions", "Ok");
    });
  }

  /**
   * Open Session page with given Session
   * 
   * @param session Session
   */
  openItem(session: Session) {
    this.navCtrl.push('SessionPage', {
      session: session
    });
  }

}
