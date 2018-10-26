import { Component } from '@angular/core';
import { Device } from '@ionic-native/device';
import { Network } from '@ionic-native/network';
import { File } from '@ionic-native/file';
import { IonicApp, NavController } from 'ionic-angular';

@Component({
  selector: 'page-refresh',
  templateUrl: 'refresh.html'
})
export class RefreshPage {

  constructor(private network: Network) {
    // Verify if internet is enabled
    if (network.type == "none") {
      console.log("pas d'internet");
    } else {
      console.log("internet dispo");
      if (navigator.serviceWorker.controller) {

        navigator.serviceWorker.controller.postMessage({
            "command": "CLEAR_CACHE",
            "message": "CLEAR_CACHE"
        });
      }
    }

  }
  
}
