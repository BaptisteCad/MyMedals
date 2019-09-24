import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { NavController } from 'ionic-angular';
import { DataProvider } from '../../services/dataProvider';

import * as go from 'gojs'

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
    //   var $ = go.GraphObject.make;  // for conciseness in defining templates

    // let myDiagram = $(go.Diagram, "myDiagram",  // create a Diagram for the DIV HTML element
    //               { initialContentAlignment: go.Spot.Center });  // center the content

    // // define a simple Node template
    // myDiagram.nodeTemplate =
    //   $(go.Node, "Auto",
    //     $(go.Shape, "RoundedRectangle",
    //       // Shape.fill is bound to Node.data.color
    //       new go.Binding("fill", "color")),
    //     $(go.TextBlock,
    //       { margin: 3 },  // some room around the text
    //       // TextBlock.text is bound to Node.data.key
    //       new go.Binding("text", "key"))
    //   );

    // // but use the default Link template, by not setting Diagram.linkTemplate

    // // create the model data that will be represented by Nodes and Links
    // myDiagram.model = new go.GraphLinksModel(
    // [
    //   { key: "Alpha", color: "lightblue" },
    //   { key: "Beta", color: "orange" },
    //   { key: "Gamma", color: "lightgreen" },
    //   { key: "Delta", color: "pink" }
    // ],
    // [
    //   { from: "Alpha", to: "Beta" },
    //   { from: "Alpha", to: "Gamma" },
    //   { from: "Beta", to: "Beta" },
    //   { from: "Gamma", to: "Delta" },
    //   { from: "Delta", to: "Alpha" }
    // ]);

    // // enable Ctrl-Z to undo and Ctrl-Y to redo
    // // (should do this after assigning Diagram.model)
    // myDiagram.undoManager.isEnabled = true;
      // this.getOwners()
      // this.getBrothers()
      // this.getPartners()

      var diagram = new go.Diagram("myDiagramDiv");
      diagram.model = new go.GraphLinksModel(
        [{ key: "Hello" },   // two node data, in an Array
        { key: "World!" }],
        [{ from: "Hello", to: "World!"}]  // one link data, in an Array
      );
    })
    .catch(e => console.log(e))
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
    // let tree = new OwnerTree();

    // let ancestors = owners.filter(function (owner) { return owner.father === 0 && owner.mother === 0; });
    // ancestors.forEach(ancestor => {
    //   tree.children.push(ancestor);
    //   owners.splice(owners.indexOf(ancestor), 1);
    // })

    // while(owners.length > 0) {
    //   owners.forEach(own => {
    //     tree.
    //   });
    // }

    var map = {}, node, roots = [], i;
    for (i = 0; i < owners.length; i += 1) {
      map[owners[i].id] = i; // initialize the map
      owners[i].children = []; // initialize the children
    }
    for (i = 0; i < owners.length; i += 1) {
      node = owners[i];
      if (node.parentId !== "0") {
        // if you have dangling branches check that map[node.parentId] exists
        owners[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    console.log(roots);
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