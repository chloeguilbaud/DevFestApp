import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Presentateur } from '../../entities/presentateur';
import { Session } from '../../entities/session';

@Component({
  selector: 'page-presentateurs',
  templateUrl: 'presentateurs.html'
})
export class PresentateursPage {

  presentateurs: Presentateur[];

  constructor(public navCtrl: NavController) {
    // TODO: this.presentateurs.request();
    // Mock:
    this.presentateurs = [];
    this.presentateurs.push(new Presentateur('Lagaff', 'Vincent', [new Session('J\'ai un beau crâne')]));
    // EndMock
  }

  openItem(presentateur: Presentateur) {
    this.navCtrl.push('PresentateurPage', {
      presentateur: presentateur
    });
  }

}
