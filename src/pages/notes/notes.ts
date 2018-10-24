import { Component } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

import {ErrorAlertHandler} from "../../manager/error.handler/error.alert.handler";

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html'
})
export class NotesPage {

  public imageSrc: string;

  constructor(public camera: Camera, private file: File, private alertHandler: ErrorAlertHandler) {

  }

  takePhotoFromCamera() {

    const options : CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options) .then((imageData) => {
      // Spliting the file and the path from FILE_URI result
      let filename = imageData.substring(imageData.lastIndexOf('/')+1);
      let path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
      // Using the method readDataURL
      this.file.readAsDataURL(path, filename).then(res=> {
        this.imageSrc = res;
      } );
    }, (err) => {
      console.error(err);
      this.alertHandler.presentAlert("Oups...", "Prise de photo impossible... retente plus tard?", "Ok :'(");
    });

  }

}
