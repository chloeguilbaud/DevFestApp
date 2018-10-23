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

import { MyApp } from './app.component';
import { Api, Sessions, Presentateurs } from '../providers/index';
import { AgendaPage } from "../pages/agenda/agenda";
import { AccueilPage } from "../pages/accueil/accueil";
import { PresentateursPage } from "../pages/presentateurs/presentateurs";
import { SessionsPage } from "../pages/sessions/sessions";
import { TelephonePage } from "../pages/telephone/telephone";
import { NotesPage } from "../pages/notes/notes";

import { Schedule } from "../providers/schedule/schedule";
import { QueryErrorHandler } from "../manager/error.handler/query.error.handler";
import { SessionsHandler } from '../manager/session/session';
import { PresentateursHandler } from '../manager/presentateur/presentateur'
import { ScheduleManager } from "../manager/schedule/schedule.manager";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    AgendaPage,
    AccueilPage,
    PresentateursPage,
    SessionsPage,
    TelephonePage,
    NotesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
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
    MyApp,
    AgendaPage,
    AccueilPage,
    PresentateursPage,
    SessionsPage,
    TelephonePage,
    NotesPage
  ],
  providers: [
    Api,
    Sessions,
    Schedule,
    Presentateurs,
    ScheduleManager,
    QueryErrorHandler,
    StatusBar,
    SplashScreen,
    SessionsHandler,
    PresentateursHandler,
    Device,
    Network,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
