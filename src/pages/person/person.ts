import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

// Services
import { DataProvider } from '../../services/dataProvider'

// Models
import { Owner } from '../../models/owner'

// Components
import { AddOwnerPage } from '../addOwner/addOwner'
import { MedalPage } from '../medal/medal'

@Component({
  selector: 'page-person',
  templateUrl: 'person.html'
})
export class PersonPage {

  owners: Owner[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private dataProvider: DataProvider) {
  }

  ionViewDidEnter(){
    this.getOwners()
  }

  presentAddOwnerModal() {
    let addOwnerModal = this.modalCtrl.create(AddOwnerPage, {})
    addOwnerModal.present()
  }

  getOwners() {
    this.dataProvider.GetAllOwners().then((owners) => {
      this.owners = owners
    });
  }

  delete(id: number) {
    alert(id)
    this.dataProvider.DeleteOwner(id).then(() => {
      alert('Owner deleted')
      this.getOwners()
    })
  }

  showMedal(id: number) {
    this.navCtrl.push(MedalPage, {
      ownerId: id
    });
  }
}
