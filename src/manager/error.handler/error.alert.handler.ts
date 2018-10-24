import { Injectable } from '@angular/core';

import {Schedule} from "../../providers";

import { AlertController } from 'ionic-angular';

/**
 * Enable alert
 */
@Injectable()
export class ErrorAlertHandler {

  constructor(public schedule: Schedule, private alertCtrl: AlertController) {

  }

  /**
   * Presents an alert with the given message.
   * @param {String} title alert pop-up title
   * @param {String} error the error message
   * @param {String} button the button label
   */
  public presentAlert(title: string, error: String, button: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: "" + error,
      buttons: ['Ok']
    });
    alert.present();
  }


}
