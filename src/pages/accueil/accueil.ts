import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { ScheduleManager } from '../../manager/schedule/schedule.manager';

@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class AccueilPage {

  public datedebut: String;
  public datefin: String;
  public hidedate: boolean;

  constructor(public navCtrl: NavController, public scheduleM: ScheduleManager) {

    this.hidedate = false;
    scheduleM.getDevFestDates().then((res) => {
      this.datedebut = res["debut"];
      this.datefin = res["fin"];
    }).catch(() => {
      this.hidedate = true;
    });
      console.log(scheduleM.getDevFestDates());

  }

}
