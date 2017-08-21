import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { MedalPage } from '../medal/medal';
import { PersonPage } from '../person/person';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AboutPage;
  tab2Root = PersonPage;
  tab3Root = MedalPage;

  constructor() {

  }
}
