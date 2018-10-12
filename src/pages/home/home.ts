import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Session } from '../../entities/session';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  SessionPage

  /**
   * Navigate to the detail page for this item.
   */
  openItem(session: Session) {
    this.navCtrl.push('SessionPage', {
      session: session
    });
  }

}
