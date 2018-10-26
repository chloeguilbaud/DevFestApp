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


  constructor() {
    if (navigator.serviceWorker.controller) {

      navigator.serviceWorker.controller.postMessage({
          "command": "CLEAR_CACHE",
          "message": "CLEAR_CACHE"
      });
  }
  }

}
