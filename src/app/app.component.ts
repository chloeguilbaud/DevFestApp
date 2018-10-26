import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav, Events } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AccueilPage } from '../pages/accueil/accueil';
import { SessionsPage } from '../pages/sessions/sessions';
import { PresentateursPage } from '../pages/presentateurs/presentateurs';
import { TelephonePage } from '../pages/telephone/telephone';
import { RefreshPage } from '../pages/refresh/refresh';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = AccueilPage;

  pages: Array<{ title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events: Events
  ) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();

      // Get l'évenement du changement de tab extérieur
      events.subscribe('changetab', (wantedPage, time) => {
        for (let i = 0; i < this.pages.length; i++) {
          if (this.pages[i].title === wantedPage) {
            this.nav.setRoot(this.pages[i].component);
          }
        }
      });
    });

    // List des pages permettant la création du menu
    this.pages = [
      { title: 'Accueil', component: AccueilPage },
      { title: 'Sessions', component: SessionsPage },
      { title: 'Présentateurs', component: PresentateursPage },
      { title: 'Téléphone', component: TelephonePage },
      { title: 'Refresh', component: RefreshPage }
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

