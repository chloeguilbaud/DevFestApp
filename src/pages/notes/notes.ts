import { Component } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html'
})
export class NotesPage {

  constructor(private camera: Camera) {

  }

}
