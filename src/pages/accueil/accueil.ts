import { Component } from '@angular/core';

import { ScheduleManager } from '../../manager/schedule/schedule.manager';

@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class AccueilPage {

  public datedebut: String;
  public datefin: String;
  public hidedate: boolean;

  constructor(public scheduleM: ScheduleManager) {

    this.hidedate = false;
    // Getting the devfest dates
    scheduleM.getDevFestDates().then((res) => {
      this.datedebut = res["debut"];
      this.datefin = res["fin"];
    }).catch(() => {
      this.hidedate = true;
    });

  }

}
