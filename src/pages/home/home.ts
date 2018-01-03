import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { NavController } from 'ionic-angular';
import { DataProvider } from '../../services/dataProvider';

// Components
// import { OwnerThumbnail } from '../person/thumbnailOwner'

// Models
import { OwnerViewModel } from '../../models/owner'
import { Partner } from '../../models/partner'
import { Brother } from '../../models/brother'

@Component({ selector: 'home', templateUrl: 'home.html' })
export class HomePage {
  
  owners: OwnerViewModel[]
  partners: Partner[]
  brothers: Brother[]

  constructor(public navCtrl: NavController, public dataProvider: DataProvider, protected platform: Platform) {
  }

  ionViewDidEnter() {
    this.platform.ready()
    .then(() => {
      this.getOwners()
      this.getBrothers()
      this.getPartners()
    })
    // .then(() => {
    //   
    // })
    // .then(() => {
    //   
    // })
  }

  getOwners() {
    this.dataProvider.GetAllOwners().then((owners) => {
      console.log('get owners')
      this.owners = <OwnerViewModel[]>owners
    })
    .catch(e => console.log(e));
  }

  getPartners() {
    this.dataProvider.GetAllPartners().then((partners) => {
      console.log('get partners')
      this.partners = <Partner[]>partners
    })
    .catch(e => console.log(e));
  }
  
  getBrothers() {
    this.dataProvider.GetAllBrothers().then((brothers) => {
      console.log('get brothers')
      this.brothers = <Brother[]>brothers
    })
    .catch(e => console.log(e));
  }
}