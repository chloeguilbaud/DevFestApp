import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

import {HttpErrorResponse} from '@angular/common/http';

import {Schedule} from '../../providers';

@Injectable()
export class ScheduleManager {

  constructor(public schedule: Schedule, private alertCtrl: AlertController) {

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
            console.log(dates);
            return resolve(dates);
          },
          error => {
            this.handelError(error);
            return reject({err: true, errorMsg: error});
          } // error path
        );
    });

  }

  private handelError(error: any) {
    let errMsg: String;
    errMsg = this.findError(error);
    this.presentAlert(errMsg);
  }

  private findError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return "Impossible de se connecter au réseau.";
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      return "Requête incorrecte envoyée au serveur. Veuillez contacter le support."
    }
    // return an observable with a user-facing error message
    /*console.log("alors la...");
    this.serveurerror = "Un truc vient de se passer... Mais on ne sais pas quoi... Essaie plus tard ? ;)"*/
  };

  presentAlert(error: String) {
    let alert = this.alertCtrl.create({
      title: 'Ho non!',
      subTitle: "" + error,
      buttons: ['Ok']
    });
    alert.present();
  }

}
