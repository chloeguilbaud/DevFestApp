import {HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Schedule} from "../../providers";

import { AlertController } from 'ionic-angular';

/**
 * Enable error managing when impossible to reach the server.
 *  - Log errors for user
 *  - Alert message for developpers
 */
@Injectable()
export class QueryErrorHandler {

  constructor(public schedule: Schedule, private alertCtrl: AlertController) {

  }

  /*
  Enables connexion problem management and presents an alert.
   */
  public handel(error: any) {
    let errMsg = this.findError(error);
    console.error("Impossible de joindre le serveur");
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
  };

  /**
   * Presents an alert indicating the connexion error.
   * @param {String} error the error message
   */
  private presentAlert(error: String) {
    let alert = this.alertCtrl.create({
      title: 'Ho non!',
      subTitle: "" + error,
      buttons: ['Ok']
    });
    alert.present();
  }


}
