import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

// Services
import { DataProvider } from '../../services/dataProvider'

// Models
import { Medal } from '../../models/medal'
//import { Picture } from '../../models/picture'

// Components
import { AddMedalPage } from '../addMedal/addMedal'

@Component({
  selector: 'page-medal',
  templateUrl: 'medal.html'
})
export class MedalPage {

  ownerId: number;
  medals: Medal[];

  constructor(public navCtrl: NavController, private navParams: NavParams, public modalCtrl: ModalController, private dataProvider: DataProvider) {
  }

  ionViewDidEnter() {
    this.ownerId = this.navParams.get('ownerId')
    if (this.ownerId) {
      this.dataProvider.GetMedalsByOwner(this.ownerId).then((medals) => {
        this.medals = medals;
      });
    } else {
      this.getMedals()
    }
  }

  presentAddMedalModal() {
    let addMedalModal = this.modalCtrl.create(AddMedalPage, {});
    addMedalModal.present();
  }

  getMedals() {
    this.dataProvider.GetAllMedals().then((medals) => {
      this.medals = medals;
    });
  }

  delete(id: number) {
    this.dataProvider.DeleteMedal(id).then(() => {
      alert('Medal deleted')
      this.getMedals()
    })
  }

  update(id: number) {
    this.navCtrl.push(AddMedalPage, {
      medalId: id
    });
  }
}
