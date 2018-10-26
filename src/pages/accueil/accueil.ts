import { Component, ViewChild } from '@angular/core';

import { ScheduleManager } from '../../manager/schedule/schedule.manager';
import { Nav, App, Events } from 'ionic-angular';

@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class AccueilPage {

  @ViewChild(Nav) nav: Nav;

  public datedebut: String;
  public datefin: String;
  public hidedate: boolean;

  constructor(public scheduleM: ScheduleManager,
              public events: Events) {

    this.hidedate = false;
    // Getting the devfest dates
    scheduleM.getDevFestDates().then((res) => {
      this.datedebut = res["debut"];
      this.datefin = res["fin"];
    }).catch(() => {
      this.hidedate = true;
    });

  }

  /**
   * Change la tab par celle dont le nom est envoyé en paramètre
   * 
   * @param page string
   */
  openPage(page) {
    // Envoi l'évènement du changement de tab extérieur
    this.events.publish('changetab', page, Date.now());
  }

}
