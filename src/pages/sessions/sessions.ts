import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Session } from '../../entities/session';
import { Presentateur } from '../../entities/presentateur';
import { SessionsHandler } from '../../manager/session/session'

@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html'
})
export class SessionsPage {

  sessions: Session[];

  constructor(public navCtrl: NavController, public sessionsHandler: SessionsHandler) {
    this.sessions = [];
    sessionsHandler.query().then((response: Session[]) => {
      this.sessions = response;
    });
    // TODO: this.sessions.request();
    // Mock:
    // this.sessions = [];
    // this.sessions.push(new Session('J\'ai un beau crâne', [new Presentateur('Lagaff', 'Vincent')]));
    // // EndMock
  }

  openItem(session: Session) {
    this.navCtrl.push('SessionPage', {
      session: session
    });
  }

}
