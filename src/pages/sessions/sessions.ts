import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Session } from '../../entities/session';

@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html'
})
export class SessionsPage {

  sessions: Session[];

  constructor(public navCtrl: NavController) {
    this.sessions = [];
    this.sessions.push(new Session('Première session'));
    this.sessions.push(new Session('Deuxième session'));
    this.sessions.push(new Session('Troixième session'));
    this.sessions.push(new Session('Quatrième session'));
  }

  openItem(session: Session) {
    this.navCtrl.push('SessionPage', {
      session: session
    });
  }

}
