import { Component } from '@angular/core';
import { Device } from '@ionic-native/device';
import { Network } from '@ionic-native/network';
import { File } from '@ionic-native/file';
import { IonicApp, NavController } from 'ionic-angular';
import {ErrorAlertHandler} from "../../manager/error.handler/error.alert.handler";

@Component({
  selector: 'page-refresh',
  templateUrl: 'refresh.html'
})
export class RefreshPage {

  constructor(private network: Network, private alertHandler: ErrorAlertHandler) {

    // Verify if internet is enabled
    if (network.type == "none") {
      console.log("Internet disabled");
      alertHandler.presentAlert("Network", "Y a pas internet... C'est pas une bonne idée de tout vider...", "Tu as raison.");
    } else {
      console.log("Internet enabled");

      // Empty cache
      if (navigator.serviceWorker.controller) {

        navigator.serviceWorker.controller.postMessage({
            "command": "CLEAR_CACHE",
            "message": "CLEAR_CACHE"
        });

      }
    }

  }

}
