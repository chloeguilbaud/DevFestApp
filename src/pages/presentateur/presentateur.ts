import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Presentateurs } from '../../providers';
import { Presentateur } from '../../entities/presentateur';

@IonicPage()
@Component({
  selector: 'presentateur-page',
  templateUrl: 'presentateur.html'
})
export class PresentateurPage {
  presentateur: Presentateur;

  constructor(public navCtrl: NavController, navParams: NavParams, presentateurs: Presentateurs) {
    this.presentateur = navParams.get('presentateur');
  }

}
