import { Component, Input } from '@angular/core';

// Services
import { DataProvider } from '../../services/dataProvider'

// Models
import { Owner, OwnerViewModel } from '../../models/owner'

@Component({
  selector: 'thumbnail-owner',
  templateUrl: 'thumbnailOwner.html'
})
export class OwnerThumbnail {

    private _id: number;
    private _owners: OwnerViewModel[];
    owner: Owner
    isLoaded: boolean
    brothers: OwnerViewModel[]

    
    @Input()
    set id(id: number) {
    // Here you can do what you want with the variable
        this._id = id;
    }
    get id() {
        return this._id
    }

    @Input()
    set owners(owners: OwnerViewModel[]) {
        this._owners = owners
    }
    get owners() {
        return this._owners
    }

    constructor(public dataProvider: DataProvider) {
        this.isLoaded = false
    }

    ngOnChanges() {
        // console.log('ngOnChanges ' + this._id)
        if (this._owners) {
            let ownerId = this._id
            this.owner = this._owners.find(function (o) { return o.id == ownerId })
            if (this.owner === null){
                this._owners.find(function (o) { return o.id == ownerId }).isLoaded = true
            }
            let fatherId = this.owner.father
            // console.log('fatherId : ' + fatherId)
            let motherId = this.owner.mother
            // console.log('motherId : ' + motherId)
            if (motherId !== 0 || fatherId !== 0) {
                this.brothers = this._owners.filter(function (own) { return own.father === fatherId && own.mother === motherId && own.id !== ownerId})
            } else {
                this.brothers = new Array<OwnerViewModel>()
            }
            this.brothers.push(<OwnerViewModel>this.owner)
            // console.log('brothers : ')
            // console.log(this.brothers)
        }
    }

    ngDoCheck() {
        if (this.owner && this.owner.id !== 0){
            let alreadyExists = document.getElementById('tn_owner_' + this.owner.id) !== undefined
            this.isLoaded = alreadyExists && true
        }
    }
}
