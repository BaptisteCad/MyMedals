import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { MedalPage } from '../medal/medal';
import { PersonPage } from '../person/person';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PersonPage;
  tab3Root = MedalPage;

  constructor() {

  }
}
