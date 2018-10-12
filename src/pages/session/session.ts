import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Sessions } from '../../providers';
import { Session } from '../../entities/session';

@IonicPage()
@Component({
  selector: 'session-page',
  templateUrl: 'session.html'
})
export class SessionPage {
  session: any;

  constructor(public navCtrl: NavController, navParams: NavParams, conferences: Sessions) {
    // this.session = navParams.get('session');
    this.session = new Session('test');
  }

}
