import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Services
import { DataProvider } from '../../services/dataProvider'

// Models
import { Medal } from '../../models/medal'

@Component({
  selector: 'page-medal',
  templateUrl: 'medal.html'
})
export class MedalPage {

  ownerId: number;
  medals: Medal[];

  constructor(public navCtrl: NavController, private navParams: NavParams, private dataprovider: DataProvider) {
    this.ownerId = this.navParams.get('ownerId');
    if (this.ownerId) {
      this.dataprovider.GetMedalsByOwner(this.ownerId).then((medals) => {
        this.medals = medals;
      });
    } else {
      this.dataprovider.GetAllMedals().then((medals) => {
        this.medals = medals;
      });
    }
  }
}
