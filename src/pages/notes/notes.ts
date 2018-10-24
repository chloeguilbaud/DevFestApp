import { Component } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html'
})
export class NotesPage {

  public imageSrc: string;

  constructor(public camera: Camera, private file: File) {

  }

  getPhoto(event, srcType) {

   /* const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: srcType
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
      //alert(base64Image);
      this.imageSrc = imageData;
    }, (err) => {
      // Handle error
    });*/


    /*const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      sourceType: srcType,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.FILE_URI
    };

    this.camera.getPicture(options).then((imageData) => {
      //needs to import file plugin
      //split the file and the path from FILE_URI result
      let filename = imageData.substring(imageData.lastIndexOf('/')+1);
      this.imageSrc =  imageData.substring(0,imageData.lastIndexOf('/')+1);
      //then use the method reasDataURL  btw. var_picture is ur image variable
      //this.file.readAsDataURL(path, filename).then(res=> this.imageSrc = res  );
    })*/

    const options : CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true,
      saveToPhotoAlbum: true
    };
    this.camera.getPicture(options) .then((imageData) => {
      //needs to import file plugin
      //split the file and the path from FILE_URI result
      let filename = imageData.substring(imageData.lastIndexOf('/')+1);
      let path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
      //then use the method reasDataURL  btw. var_picture is ur image variable
      this.file.readAsDataURL(path, filename).then(res=> {
        this.imageSrc = res;
      } );
    }, (err) => {
        
    });

  }

}
