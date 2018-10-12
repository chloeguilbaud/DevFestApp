import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import {Schedule} from '../../providers';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class AccueilPage {

  public datedebut: String;
  public datefin: String;
  public hidedate: boolean;
  public serveurerror: String;

  constructor(public navCtrl: NavController, public schedule: Schedule, private alertCtrl: AlertController) {

    this.hidedate = false;

    this.schedule.query("schedule")
      .subscribe((data: any) => {
          this.datedebut = data[0]["date"];
          this.datefin = data[data.length - 1]["date"];
          console.log(this.datedebut, this.datefin);
        },
          error => {
            this.handelError(error);
          } // error path
      );
  }

  private handelError(error: any) {
    this.hidedate = true;
    this.findError(error);
    this.presentAlert(this.serveurerror);
  }

   private findError(error: HttpErrorResponse) {
     if (error.error instanceof ErrorEvent) {
       // A client-side or network error occurred. Handle it accordingly.
       console.error('An error occurred:', error.error.message);
       this.serveurerror = "Impossible de se connecter au réseau."
     } else {
       // The backend returned an unsuccessful response code.
       // The response body may contain clues as to what went wrong,
       console.error(
         `Backend returned code ${error.status}, ` +
         `body was: ${error.error}`);
       this.serveurerror = "Requête incorrecte envoyée au serveur. Veuillez contacter le support."
     }
     // return an observable with a user-facing error message
     console.log("alors la...");
     this.serveurerror = "Un truc vient de se passer... Mais on ne sais pas quoi... Essaie plus tard ? ;)"
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
