import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { MedalPage } from '../pages/medal/medal';
import { PersonPage } from '../pages/person/person';
import { AddOwnerPage } from '../pages/addOwner/addOwner';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Native components
import { Camera } from '@ionic-native/camera';
import { SQLite } from '@ionic-native/sqlite';

// Services
import { DataProvider } from '../services/dataProvider'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PersonPage,
    AddOwnerPage,
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
    HomePage,
    PersonPage,
    AddOwnerPage,
    MedalPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    SQLite,
    DataProvider
  ]
})
export class AppModule {}
