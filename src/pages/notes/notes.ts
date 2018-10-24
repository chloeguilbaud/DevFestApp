import { Component } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker";

import { ErrorAlertHandler } from "../../manager/error.handler/error.alert.handler";

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html'
})
export class NotesPage {

  public imageSrc: string;

  constructor(public camera: Camera,
              private imgPicker: ImagePicker,
              private file: File,
              private alertHandler: ErrorAlertHandler) {

  }

  /**
   * Enables photo taking by camera and showing it on page
   */
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

    this.camera.getPicture(options).then((imageData) => {
      this.parseImg(imageData);
    }, (err) => {
      console.error(err);
      this.alertHandler.presentAlert("Oups...", "Prise de photo annulée... retente plus tard?", "Ok :'(");
    });

  }

  /**
   * Enables photo taking by camera and showing it on page
   */
  getPhotoFromLibrary() {

    const options : ImagePickerOptions = {
      maximumImagesCount: 1
    };

    this.imgPicker.getPictures(options).then((results) => {
      console.log("res", results);
      this.parseImg(results[0]);
    }, (err) => {
      console.error(err);
      this.alertHandler.presentAlert("Oups...", "Sélection de photo annulée... retente plus tard?", "Ok :'(");
    });

  }

  /**
   * Parse image to be displayed on page
   * @param {string} imageData image data
   */
  private parseImg(imageData: string) {
    // Spliting the file and the path from FILE_URI result
    console.log("imageData", imageData);
    let filename = imageData.substring(imageData.lastIndexOf('/')+1);
    console.log("filename", filename);
    let path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
    console.log("path", path);
    // Using the method readDataURL
    this.file.readAsDataURL(path, filename).then(res => {
      this.imageSrc = res;
    } );
  }
}
