import { Component } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker";

import { ErrorAlertHandler } from "../../manager/error.handler/error.alert.handler";
import { Session } from "../../entities/session";
import { IonicPage, NavParams } from 'ionic-angular';
import { DbManager } from "../../manager/database/db.manager";

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html'
})
export class NotesPage {

  public image_src: string;
  public note_txt: string;
  public s: Session;

  constructor(navParams: NavParams,
              public camera: Camera,
              private imgPicker: ImagePicker,
              private file: File,
              private alertHandler: ErrorAlertHandler,
              private dbManager: DbManager) {

    this.s = navParams.get('session');

    this.loadNotes();
    //this.loadImage();

  }

  /**
   * Loading the notes of the current session (if there are some)
   */
  public loadNotes() {
    this.dbManager.getSessionNote(this.s.id).then((res) => {
        this.note_txt = res;
      }
    ).catch((err) => {
      this.noteEditErrorHandler(err);
    });
  }

  /**
   * Loading the image of the current session (if there is one)
   */
  public loadImage() {
    this.dbManager.getSessionImage(this.s.id).then((imageData) => {
      this.displayImg(imageData);
    }).catch((err) => {
      this.imageEditErrorHandler(err);
    });
  }

  /**
   * Save notes in the database
   */
  saveNotes() {
    this.dbManager.saveSessionNote(this.s.id, this.note_txt).then(() => {
      this.alertHandler.presentAlert("Uiii!", "Vos notes ont été enregistrée avec succès!", "Ok");
    })
      .catch((err) => {
        this.noteEditErrorHandler(err);
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
      this.displayAndSaveImg(imageData);
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
      this.displayAndSaveImg(results[0]);
    }, (err) => {
      console.error(err);
      this.alertHandler.presentAlert("Oups...", "Sélection de photo annulée... retente plus tard?", "Ok :'(");
    });

  }

  /**
   * Display and saves image to be displayed on page
   * @param {string} imageData image data
   */
  private displayAndSaveImg(imageData: string) {
    // Saving image in data base
    this.dbManager.saveSessionImage(this.s.id, imageData);
    // Parse image
    this.displayImg(imageData);
  }

  /**
   * Display image to be displayed on page
   * @param {string} imageData image data
   */
  private displayImg(imageData: string) {
    // Spliting the file and the path from FILE_URI result
    console.log("imageData", imageData);
    let filename = imageData.substring(imageData.lastIndexOf('/')+1);
    console.log("filename", filename);
    let path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
    console.log("path", path);
    // Using the method readDataURL
    this.file.readAsDataURL(path, filename).then(res => {
      this.image_src = res;
    } );
  }

  /**
   * Note saving or loading error handler
   * @param err error
   */
  private noteEditErrorHandler(err: any) {
    console.error(err);
    this.alertHandler.presentAlert("Humm...", "Tu n'as pas encore de note... ou alors tes notes ont été supprimées...", "Je te pardonne");
  }

  /**
   * Image saving or loading error handler
   * @param err error
   */
  private imageEditErrorHandler(err: any) {
    console.error(err);
    this.alertHandler.presentAlert("Oups...", "Tu n'as pas encore de photo... ou alors ta photo à été supprimées...", "Je te pardonne");
  }

}
