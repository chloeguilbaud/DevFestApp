import { AlertController } from 'ionic-angular';

export class Alert {

  constructor(private alertCtrl: AlertController) {

  }

  presentAlert(error: String) {
    let alert = this.alertCtrl.create({
      title: 'Erreur',
      subTitle: "Coucou",
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
