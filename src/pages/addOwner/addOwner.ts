import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

// Services
import { DataProvider } from '../../services/dataProvider'

// Models
import { Owner } from '../../models/owner'

@Component({
  selector: 'page-add-owner',
  templateUrl: 'addOwner.html'
})
export class AddOwnerPage {

  newOwner: Owner;
  fathers: Owner[];
  mothers: Owner[];
  selectFather: Owner;
  selectMother: Owner;

  constructor(private dataProvider: DataProvider, public viewCtrl: ViewController) {
    this.newOwner = new Owner();
  }

  ionViewDidEnter() {
    this.dataProvider.GetAllOwners()
    .then((owners) => {
      this.fathers = owners.filter(function (own) { return own.gender === "H"})
      this.mothers = owners.filter(function (own) { return own.gender === "F"})
    })
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  save() {
    this.dataProvider.AddOwner(
      this.newOwner.lastname,
      this.newOwner.firstname,
      this.newOwner.description,
      this.newOwner.gender,
      this.newOwner.father,
      this.newOwner.mother
    )
  }

}
