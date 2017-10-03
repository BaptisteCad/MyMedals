import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

// Services
import { DataProvider } from '../../services/dataProvider'

// Models
import { Owner } from '../../models/owner'

@Component({
  selector: 'page-add-owner',
  templateUrl: 'addOwner.html'
})
export class AddOwnerPage {

  owner: Owner;
  fathers: Owner[];
  mothers: Owner[];

  constructor(private dataProvider: DataProvider, public viewCtrl: ViewController, private navParams: NavParams) {
    this.owner = new Owner();
  }

  ionViewDidEnter() {
    this.dataProvider.GetAllOwners()
    .then((owners) => {
      this.fathers = owners.filter(function (own) { return own.gender === "H"})
      this.mothers = owners.filter(function (own) { return own.gender === "F"})
    })

    if (this.navParams.get('ownerId')) {
      this.dataProvider.GetOwner(this.navParams.get('ownerId'))
      .then((owner) => {
        this.owner = owner
        console.log(this.owner)
      })
    }
    console.log(this.owner)
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  save() {
    console.log(this.owner.id)
    if (this.owner.id) {
      this.dataProvider.UpdateOwner(
        this.owner.id,
        this.owner.lastname,
        this.owner.firstname,
        this.owner.description,
        this.owner.gender,
        this.owner.father,
        this.owner.mother
      )
    } else {
      this.dataProvider.AddOwner(
        this.owner.lastname,
        this.owner.firstname,
        this.owner.description,
        this.owner.gender,
        this.owner.father,
        this.owner.mother
      )
    }
  }

}
