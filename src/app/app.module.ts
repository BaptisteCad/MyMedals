import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { MedalPage } from '../pages/medal/medal';
import { PersonPage } from '../pages/person/person';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Native components
import { Camera } from '@ionic-native/camera';
import { SQLite } from '@ionic-native/sqlite';

// Services
import { DataService } from '../services/data.service'

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    PersonPage,
    MedalPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    PersonPage,
    MedalPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    SQLite,
    DataService
  ]
})
export class AppModule {}
