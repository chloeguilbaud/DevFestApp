import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Presentateurs } from '../../providers';
import { Presentateur } from '../../entities/presentateur';
import { PresentateursHandler } from '../../manager/presentateur/presentateur';
import { QueryErrorHandler } from '../../manager/error.handler/query.error.handler';
import { ErrorAlertHandler } from '../../manager/error.handler/error.alert.handler';

@IonicPage()
@Component({
  selector: 'presentateur-page',
  templateUrl: 'presentateur.html'
})
export class PresentateurPage {
  presentateur: Presentateur;

  constructor(public navCtrl: NavController,
              navParams: NavParams,
              public presentateursHandler: PresentateursHandler,
              public alertHandler: ErrorAlertHandler) {
    // Get presentateur given in parameter from previous page
    this.presentateur = navParams.get('presentateur');
    // Request given presentater from API
    presentateursHandler.getPresentateur(this.presentateur.id).then((response: Presentateur) => {
      this.presentateur = response;
    }).catch((err) => {
      this.alertHandler.presentAlert("Aie", "Impossible de récupérer le présentateur", "Ok");
    });
  }

  /**
   * Open Session page with given Session
   * 
   * @param session Session
   */
  openItem(session: any) {
    this.navCtrl.push('SessionPage', {
      session: session
    });
  }

}
