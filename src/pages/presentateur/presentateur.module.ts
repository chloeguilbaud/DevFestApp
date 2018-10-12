import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { PresentateurPage } from './presentateur';

@NgModule({
  declarations: [
    PresentateurPage,
  ],
  imports: [
    IonicPageModule.forChild(PresentateurPage),
    TranslateModule.forChild()
  ],
  exports: [
    PresentateurPage
  ]
})
export class PresentateurPageModule { }
