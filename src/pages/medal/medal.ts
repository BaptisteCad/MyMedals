import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-medal',
  templateUrl: 'medal.html'
})
export class MedalPage {

  constructor(public navCtrl: NavController, private camera: Camera) {

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
}
