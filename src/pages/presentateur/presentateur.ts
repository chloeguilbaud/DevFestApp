import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Presentateurs } from '../../providers';
import { Presentateur } from '../../entities/presentateur';
import { PresentateursHandler } from '../../manager/presentateur/presentateur';
import { QueryErrorHandler } from '../../manager/error.handler/query.error.handler';
import { ErrorAlertHandler } from '../../manager/error.handler/error.alert.handler';
import { ContactsHandler } from '../../manager/contact/contact';

@IonicPage()
@Component({
  selector: 'presentateur-page',
  templateUrl: 'presentateur.html'
})
export class PresentateurPage {
  presentateur: Presentateur;
  public isAddContactToggled: boolean;

  constructor(public navCtrl: NavController,
              navParams: NavParams,
              public presentateursHandler: PresentateursHandler,
              public alertHandler: ErrorAlertHandler,
              public contactHandler: ContactsHandler) {
    // Get presentateur given in parameter from previous page
    this.presentateur = navParams.get('presentateur');

    this.isAddContactToggled = false;

    // Request given presentater from API
    presentateursHandler.getPresentateur(this.presentateur.id).then((response: Presentateur) => {
      this.presentateur = response;
      // Enable or disable button whether the speaker is in contact or not
      contactHandler.exists(this.presentateur).then((isExist: boolean) => {
        this.isAddContactToggled = isExist;
      }).catch((err) => {
        this.alertHandler.presentAlert('Aie', 'Impossible de savoir si le presentateur existe', 'ok');
      });
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

  /**
   * Triggered when toogle is enabled/disabled
   */
  onAddToContactToggleChange() {
    // If the button is enable
    if (this.isAddContactToggled) {
      // Delete the contact
      this.contactHandler.remove(this.presentateur).then(() => {
        // Disable button when done
        this.isAddContactToggled = false;
      }).catch((err) => {
        this.alertHandler.presentAlert('Aie', "Impossible de retirer le présentateur des contacts", 'ok');
      });
    // If the button is disable
    } else {
      // Add the contact
      this.contactHandler.add(this.presentateur).then(() => {
        // Disable button when done
        this.isAddContactToggled = true;
      }).catch((err) => {
        this.alertHandler.presentAlert('Aie', "Impossible d'ajouter le présentateur aux contacts", 'ok');
      });
    }
  }
}
