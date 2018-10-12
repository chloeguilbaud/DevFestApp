import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AgendaPage } from "../pages/agenda/agenda";
import { ConferencePage } from "../pages/conference/conference";
import { PresentateursPage } from "../pages/presentateurs/presentateurs";
import { SessionsPage } from "../pages/sessions/sessions";
import { TelephonePage } from "../pages/telephone/telephone";

@NgModule({
  declarations: [
    MyApp,
    AgendaPage,
    ConferencePage,
    PresentateursPage,
    SessionsPage,
    TelephonePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AgendaPage,
    ConferencePage,
    PresentateursPage,
    SessionsPage,
    TelephonePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
