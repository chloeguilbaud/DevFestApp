import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Presentateur } from '../../entities/presentateur';

@Component({
  selector: 'page-presentateurs',
  templateUrl: 'presentateurs.html'
})
export class PresentateursPage {

  presentateurs: Presentateur[];

  constructor(public navCtrl: NavController) {
    this.presentateurs = [];
    this.presentateurs.push(new Presentateur('Reichmann', 'Jean-Luc'));
    this.presentateurs.push(new Presentateur('Lagaff', 'Vincent'));
  }

  openItem(presentateur: Presentateur) {
    this.navCtrl.push('PresentateurPage', {
      presentateur: presentateur
    });
  }

}
