import { Injectable } from '@angular/core';

import { Schedule } from '../../providers';
import { QueryErrorHandler } from "../error.handler/query.error.handler";

@Injectable()
export class ScheduleManager {

  constructor(public schedule: Schedule, private errorHandler: QueryErrorHandler) {

  }

  /**
   * Gives Promise :
   *  - resolve : datedebut and datefin
   *  - reject : err, errorMsg
   */
  public getDevFestDates() {

    let dates = {};

    return new Promise((resolve, reject) => {

      this.schedule.query("schedule")
        .subscribe((data: any) => {
            dates = {
              debut: data[0]["date"],
              fin: data[data.length - 1]["date"]
            };
            return resolve(dates);
          },
          error => {
            this.errorHandler.handle(error);
            return reject({err: true, errorMsg: error});
          } // error path
        );
    });

  }

}
