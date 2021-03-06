import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { Device } from '@ionic-native/device';
import { Network } from '@ionic-native/network';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { ImagePicker } from "@ionic-native/image-picker";

import { DevFest } from './app.component';
import { Api, Sessions, Presentateurs } from '../providers';
import { AccueilPage } from "../pages/accueil/accueil";
import { PresentateursPage } from "../pages/presentateurs/presentateurs";
import { SessionsPage } from "../pages/sessions/sessions";
import { TelephonePage } from "../pages/telephone/telephone";
import { RefreshPage } from "../pages/refresh/refresh";

import { Schedule } from "../providers";
import { QueryErrorHandler } from "../manager/error.handler/query.error.handler";
import { SessionsHandler } from '../manager/session/session';
import { PresentateursHandler } from '../manager/presentateur/presentateur'
import { ScheduleManager } from "../manager/schedule/schedule.manager";
import { ErrorAlertHandler } from "../manager/error.handler/error.alert.handler";
import { ContactsHandler } from "../manager/contact/contact";

import { IonicStorageModule } from '@ionic/storage';
import { DbConf } from "./db.conf";
import { Contacts } from '@ionic-native/contacts';
import { DbManager } from "../manager/database/db.manager";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    DevFest,
    AccueilPage,
    PresentateursPage,
    SessionsPage,
    TelephonePage,
    RefreshPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(DevFest),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DevFest,
    AccueilPage,
    PresentateursPage,
    SessionsPage,
    TelephonePage,
    RefreshPage
  ],
  providers: [
    Api,
    Sessions,
    Schedule,
    Presentateurs,
    ScheduleManager,
    QueryErrorHandler,
    ErrorAlertHandler,
    DbConf,
    DbManager,
    StatusBar,
    SplashScreen,
    SessionsHandler,
    PresentateursHandler,
    ContactsHandler,
    Device,
    Network,
    Camera,
    Contacts,
    File,
    ImagePicker,
    //SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
