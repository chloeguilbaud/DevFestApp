import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SessionPage } from './session';

@NgModule({
  declarations: [
    SessionPage,
  ],
  imports: [
    IonicPageModule.forChild(SessionPage),
    TranslateModule.forChild()
  ],
  exports: [
    SessionPage
  ]
})
export class SessionPageModule { }
