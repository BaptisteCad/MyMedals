import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { NavController } from 'ionic-angular';
import { DataProvider } from '../../services/dataProvider';

// Components
// import { OwnerThumbnail } from '../person/thumbnailOwner'

// Models
import { OwnerViewModel, OwnerTree } from '../../models/owner'
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

  constructTree(owners: OwnerTree[]) {
    let tree = new OwnerTree();

    let ancestors = owners.filter(function (owner) { return owner.father === 0 && owner.mother === 0; });
    ancestors.forEach(ancestor => {
      tree.children.push(ancestor);
      owners.splice(owners.indexOf(ancestor), 1);
    })

    while(owners.length > 0) {
      owners.forEach(own => {
        tree.
      });
    }
  }

  list_to_tree(list) {
    var map = {}, node, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i; // initialize the map
        list[i].children = []; // initialize the children
    }
    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.parentId !== "0") {
            // if you have dangling branches check that map[node.parentId] exists
            list[map[node.parentId]].children.push(node);
        } else {
            roots.push(node);
        }
    }
    return roots;
  }
}