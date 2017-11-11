import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { NavController } from 'ionic-angular';
import { DataProvider } from '../../services/dataProvider';

// Components
// import { OwnerThumbnail } from '../person/thumbnailOwner'

// Models
import { OwnerViewModel } from '../../models/owner'

@Component({ selector: 'home', templateUrl: 'home.html' })
export class HomePage {
  
  owners: OwnerViewModel[]

  constructor(public navCtrl: NavController, public dataProvider: DataProvider, protected platform: Platform) {
  }

  ionViewDidEnter() {
    this.platform.ready()
    .then(() => {
      this.getOwners()
    })
  }

  getOwners() {
    this.dataProvider.GetAllOwners().then((owners) => {
      this.owners = <OwnerViewModel[]>owners
    });
  }
}