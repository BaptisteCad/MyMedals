import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
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

  newMedal: Medal;
  selectOwner: Owner;
  owners: Owner[];

  constructor(public navCtrl: NavController, private dataProvider: DataProvider, private viewCtrl: ViewController,  private camera: Camera) {
    this.newMedal = new Medal();
    this.getOwners();
  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      var smallImage = <HTMLImageElement>document.getElementById('smallImage');
      smallImage.style.display = 'block';
      smallImage.src = "data:image/jpeg;base64," + imageData;
     }, (err) => {
      // Handle error
     });
  }

  save() {
    console.log(this.newMedal)
    this.dataProvider.AddMedal(
      this.newMedal.name,
      this.newMedal.description,
      this.selectOwner.id
    );
  }

  getOwners() {
    this.dataProvider.GetAllOwners().then((owners) => {
      this.owners = owners;
    });
  }
}
