import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

// Services
import { DataProvider } from '../../services/dataProvider'

// Models
import { Medal } from '../../models/medal'
import { Owner } from '../../models/owner'

@Component({
  selector: 'page-add-medal',
  templateUrl: 'addMedal.html'
})
export class AddMedalPage {

  medal: Medal;
  pictures: string[];
  selectOwner: Owner;
  owners: Owner[];

  constructor(public navCtrl: NavController, private navParams: NavParams, private dataProvider: DataProvider, private viewCtrl: ViewController,  private camera: Camera) {
    this.medal = new Medal()
  }

  ionViewDidEnter() {
    this.medal = new Medal()
    this.pictures = new Array<string>()
    this.getOwners()

    if (this.navParams.get('medalId')) {
      this.dataProvider.GetMedal(this.navParams.get('medalId'))
      .then((medal) => {
        this.medal = medal
        this.pictures = medal.pictures.map(function(pic) { return pic.image })
        console.log(this.medal)
      })
      .catch(e => console.log(e))
    }
  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      this.pictures.push(imageData);
     }, (err) => {
      // Handle error
     });
  }

  save() {
    this.dataProvider.AddMedal(
      this.medal.name,
      this.medal.description,
      this.medal.ownerId
    ).then((medalId) => {
      var promises = [];

      this.pictures.forEach(picture => {
        promises.push(
          this.dataProvider.AddPicture(picture, medalId)
        );
      });

      Promise.all(promises).then(() => {
        console.log('all pictures saved');
      })
      .catch(e => console.log(e))
    });
  }

  getOwners() {
    this.dataProvider.GetAllOwners().then((owners) => {
      this.owners = owners;
    })
    .catch(e => console.log(e));
  }
}
