import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Session } from '../../entities/session';

@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html'
})
export class SessionsPage {

  constructor(public navCtrl: NavController) {

  }

  openItem(session: Session) {
    this.navCtrl.push('SessionPage', {
      session: session
    });
  }

}
