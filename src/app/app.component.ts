import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AccueilPage } from '../pages/accueil/accueil';
import { SessionsPage } from '../pages/sessions/sessions';
import { PresentateursPage } from '../pages/presentateurs/presentateurs';
import { TelephonePage } from '../pages/telephone/telephone';
import { AgendaPage } from '../pages/agenda/agenda';

import {NotesPage} from "../pages/notes/notes";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = NotesPage;

  pages: Array<{ title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });

    // List des pages permettant la création du menu
    this.pages = [
      { title: 'Accueil', component: AccueilPage },
      { title: 'Sessions', component: SessionsPage },
      { title: 'Présentateurs', component: PresentateursPage },
      { title: 'Téléphone', component: TelephonePage },
      { title: 'Agenda', component: AgendaPage }
    ];

  }

    // Called on menu item click
    openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

}

