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

  constructor(private dataProvider: DataProvider, public viewCtrl: ViewController) {
    this.newOwner = new Owner();
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
