import { Component, Input } from '@angular/core';

// Services
import { DataProvider } from '../../services/dataProvider'

// Models
import { Owner } from '../../models/owner'

@Component({
  selector: 'thumbnail-owner',
  templateUrl: 'thumbnailOwner.html'
})
export class OwnerThumbnail {

    private _id: number;
    private _owners: Owner[];
    owner: Owner
    
    @Input()
    set id(id: number) {
    // Here you can do what you want with the variable
        this._id = id;
    }
    get id() {
        return this._id
    }

    @Input()
    set owners(owners: Owner[]) {
        this._owners = owners
    }
    get owners() {
        return this._owners
    }

    constructor(public dataProvider: DataProvider) {
    }

    ionViewDidEnter() {
        console.log('ionVoewDidEnter ' + this._id)
        let ownerId = this._id
        this.owner = this._owners.find(function (o) { return o.id == ownerId })
        console.log(this.owner)
    }
}
