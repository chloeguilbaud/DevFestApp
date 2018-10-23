import { Component } from '@angular/core';
import { Device } from '@ionic-native/device';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-telephone',
  templateUrl: 'telephone.html'
})
export class TelephonePage {

  public msg_error: string;
  public device_platform: string;
  public os_version: string;
  public device_uuid: string;
  public device_model: string;
  public device_connection_type: string;

  constructor(private device: Device, private network: Network) {
    // Getting device information
    this.msg_error = "Information non disponible";
    this.device_platform = this.device.platform;
    this.os_version = this.device.version;
    this.device_uuid = this.device.uuid;
    this.device_model = this.device.model;
    this.device_connection_type = this.network.type;
  }

}
