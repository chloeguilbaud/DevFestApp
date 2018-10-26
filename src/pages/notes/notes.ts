import { Component } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker";

import { ErrorAlertHandler } from "../../manager/error.handler/error.alert.handler";
import { Session } from "../../entities/session";
import { DbManager } from "../../database/db.manager";

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html'
})
export class NotesPage {

  public image_src: string;
  public note_txt: string;
  public s: Session;

  constructor(public camera: Camera,
              private imgPicker: ImagePicker,
              private file: File,
              private alertHandler: ErrorAlertHandler,
              private dbManager: DbManager) {

    this.s = new Session(450, "", "");

    //this.dbManager.saveSessionImage(450, );
    this.loadNotes();
    this.loadImage();

  }

  /**
   * Loading the notes of the current session (if there are some)
   */
  public loadNotes() {
    this.dbManager.getSessionNote(this.s.id).then((res) => {
        this.note_txt = res;
      }
    ).catch((err) => {
      this.handleNoteError(err);
    });
  }

  /**
   * Loading the image of the current session (if there is one)
   */
  public loadImage() {
    this.dbManager.getSessionImage(this.s.id).then((res) => {
      this.image_src = res;
    }).catch((err) => {
      this.handleImageError(err);
    });
  }

  /**
   * Save notes in the database
   */
  saveNotes() {
    this.dbManager.saveSessionNote(this.s.id, this.note_txt)
      .catch((err) => {
        this.handleNoteError(err);
      }
    );
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
      this.parseAndSaveImg(imageData);
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
      this.parseAndSaveImg(results[0]);

    }, (err) => {
      console.error(err);
      this.alertHandler.presentAlert("Oups...", "Sélection de photo annulée... retente plus tard?", "Ok :'(");
    });

  }

  /**
   * Parse image to be displayed on page
   * @param {string} imageData image data
   */
  private parseAndSaveImg(imageData: string) {
    // Spliting the file and the path from FILE_URI result
    console.log("imageData", imageData);
    let filename = imageData.substring(imageData.lastIndexOf('/')+1);
    console.log("filename", filename);
    let path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
    console.log("path", path);
    // Transforming and saving image data
    this.file.readAsDataURL(path, filename).then(res => {
      this.image_src = res;
      console.log("parsedimage", res);
      this.dbManager.saveSessionImage(this.s.id, res).catch((err) => {
        this.handleImageError(err);
      });
    });
  }

  /**
   * Note error handler
   * @param err error
   */
  private handleNoteError(err: any) {
    console.error(err);
    this.alertHandler.presentAlert("Humm...", "Tu n'as pas encore de note... ou alors tes notes ont été supprimées...", "Je te pardonne");
  }

  /**
   * Image error handler
   * @param err error
   */
  private handleImageError(err: any) {
    console.error(err);
    this.alertHandler.presentAlert("Humm...", "Tu n'as pas encore pris de photo... ou alors tes notes ont été supprimées...", "Je te pardonne");
  }

}
