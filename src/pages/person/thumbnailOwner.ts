import { Component, Input } from '@angular/core';

// Services
import { DataProvider } from '../../services/dataProvider'

// Models
import { Owner, OwnerViewModel } from '../../models/owner'
import { Partner } from '../../models/partner'
import { Brother } from '../../models/brother'

@Component({
  selector: 'thumbnail-owner',
  template: `
  <div class="parents">
    <thumbnail-owner class="mother" *ngIf="isLoaded && owner.mother !== 0" [id]="owner.mother" [owners]="owners" [partners]="partners" [brothers]="brothers"></thumbnail-owner>
    <thumbnail-owner class="father" *ngIf="isLoaded && owner.father !== 0" [id]="owner.father" [owners]="owners" [partners]="partners" [brothers]="brothers"></thumbnail-owner>
  </div>

  <div *ngIf="isLoaded" class="brotherhood">
    <div *ngFor="let brother of brothers; let first = first;" id="tn_owner_{{brother.id}}">
      <div class="thumbnail">
        {{brother.lastname}} {{brother.firstname}}
      </div>
    </div>
  </div>`,
  styles: []
})

export class OwnerThumbnail {

    private _id: number;
    private _owners: OwnerViewModel[];
    private _brothers: Brother[];
    private _partners: Partner[];
    owner: Owner
    isLoaded: boolean
    brotherhood: OwnerViewModel[]

    
    @Input()
    set id(id: number) {
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
    
    @Input()
    set brothers(brothers: Brother[]) {
        this._brothers = brothers
    }
    get brothers() {
        return this._brothers
    }
        
    @Input()
    set partners(partners: Partner[]) {
        this._partners = partners
    }
    get partners() {
        return this._partners
    }

    constructor(public dataProvider: DataProvider) {
        this.isLoaded = false
    }

    ngOnChanges() {
        console.log('ngOnChanges ' + this._id)
        console.log(this._owners)
        console.log(this._brothers)
        if (this._owners && this._brothers) {
            let ownerId = this._id
            this.owner = this._owners.find(function (o) { return o.id == ownerId })
            if (this.owner === null){
                this._owners.find(function (o) { return o.id == ownerId }).isLoaded = true
            }

            let brotherIds = this._brothers.filter(function (bro) { return bro.one === ownerId }).map(bro => bro.other)
                                .concat(this._brothers.filter(function (bro) { return bro.other === ownerId }).map(bro => bro.one))
            
            this.brotherhood = this._owners.filter(function (own) { return brotherIds.some(function (id) { return id === own.id }) })

            // let fatherId = this.owner.father
            // // console.log('fatherId : ' + fatherId)
            // let motherId = this.owner.mother
            // // console.log('motherId : ' + motherId)
            // if (motherId !== 0 || fatherId !== 0) {
            //     this.brothers = this._owners.filter(function (own) { return own.father === fatherId && own.mother === motherId && own.id !== ownerId})
            // } else {
            //     this.brothers = new Array<OwnerViewModel>()
            // }
            // this.brothers.push(<OwnerViewModel>this.owner)
            // console.log('brothers : ')
            // console.log(this.brothers)
        }
    }

    ngDoCheck() {
        if (this.owner && this.owner.id !== 0){
            let alreadyExists = document.getElementById('tn_owner_' + this.owner.id) !== undefined
            this.isLoaded = alreadyExists
        }
    }
}
