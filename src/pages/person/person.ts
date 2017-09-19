import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Services
import { DataService } from '../../services/data.service'

// Models
import { Owner } from '../../models/owner'

@Component({
  selector: 'page-person',
  templateUrl: 'person.html'
})
export class PersonPage {

  owners: Owner[];
  newOwner: Owner;

  constructor(public navCtrl: NavController, public service: DataService) {
    this.newOwner = new Owner();
    this.getOwners();
  }

  save() {
    this.service.AddOwner(
      this.newOwner.lastname,
      this.newOwner.firstname,
      this.newOwner.description,
      this.newOwner.gender,
      this.newOwner.father,
      this.newOwner.mother
    )
    this.getOwners();
  }

  getOwners() {
    this.owners = this.service.GetAllOwners();
  }

}
