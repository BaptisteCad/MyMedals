import { Platform } from 'ionic-angular';
import {Injectable} from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

// Models
import { Owner } from '../models/owner'
import { Medal } from '../models/medal'
import { Picture } from '../models/picture'

const DATABASE_NAME: string = "myMedals.db";

@Injectable()
export class DataProvider {

    public db = null;
    
    constructor(public sqlite: SQLite, platform: Platform) {
        platform.ready().then(() => {
            this.OpenDataBase();
        });
    }

    private OpenDataBase(): Promise<void> {
        return this.sqlite.create({
            name: DATABASE_NAME,
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            this.db = db;
        })
        .catch(e => console.log(e));
    }

    public CreateDataBase(): void {
        console.log('Create DB');
        this.OpenDataBase()
        .then(() => {
            this.db.executeSql('CREATE TABLE IF NOT EXISTS medals (med_id integer primary key autoincrement, med_name text, med_description text, med_owner integer)', [])
        })
        .then(() => {
            console.log('Table Medals created');
            this.db.executeSql('CREATE TABLE IF NOT EXISTS owners (own_id integer primary key autoincrement, own_lastname text, own_firstname text, own_description text, own_gender text, own_father integer, own_mother integer)', [])
        })
        .then(() => {
            console.log('Table Owners created');
            this.db.executeSql('CREATE TABLE IF NOT EXISTS pictures (pic_id integer primary key autoincrement, pic_medal number, pic_image blob)', [])
        })
        .then(() => {
            console.log('Table Pictures created');
        })
        .catch(e => console.log(e));
    }

    public GetAllOwners(): Promise<Owner[]> {
        return new Promise((resolve, reject) => {
            this.db.executeSql("select own_id, own_lastname, own_firstname, own_description, own_gender, own_mother, own_father from owners", []).then(
                (result) => {
                    resolve(this.DataToOwners(result));
                }
            );
        });
    }

    public AddOwner(lastname: string, firstname: string, description: string, gender: number, father: number, mother: number): void {
        this.db.executeSql('INSERT INTO owners (own_lastname, own_firstname, own_description, own_gender, own_father, own_mother) values (?,?,?,?,?,?)', [lastname, firstname, description, gender, father, mother])
        .then(() => {
            console.log("Owner saved")
        })
        .catch(e => console.log(e));
    }

    public UpdateOwner(id: number, lastname: string, firstname: string, description: string, gender: number, father: number, mother: number): void {
        this.db.executeSql('UPDATE owner set own_lastname = ?, own_firstname = ?, own_description = ?, own_gender = ?, own_father = ?, own_mother = ? where own_id = ?', [lastname, firstname, description, gender, father, mother, id])
        .then(() => {
            console.log('Owner updated')
        })
        .catch(e => console.log(e));
    };

    public DeleteOwner(id: number): Promise<void> {
        return this.db.executeSql('DELETE FROM owners WHERE own_id = ?', [id])
        .then(() => {
            console.log("Owner deleted")
        })
        .catch(e => console.log(e));
    }

    public GetAllMedals(): Promise<Medal[]> {
        return new Promise((resolve, reject) => {
            this.db.executeSql("select med_id, med_name, med_description, med_owner, pic_id, pic_image from medals left outer join pictures on medals.med_id = pictures.pic_medal", []).then(
                (result) => {
                    resolve(this.DataToMedals(result));
                }
            )
            .catch((e) => { alert(e.message) });
        });
    }

    public GetMedalsByOwner(ownerId: number): Promise<Medal[]> {
        return new Promise((resolve, reject) => {
            this.db.executeSql("select med_id, med_name, med_description, med_owner, pic_id, pic_image from medals left outer join pictures on medals.med_id = pictures.pic_medal where med_owner = ?", [ownerId]).then(
                (result) => {
                    resolve(this.DataToMedals(result));
                }
            );
        });
    }

    public AddMedal(name: string, description: string, owner: number) : Promise<number> {
        var createdId: number;
        return new Promise((resolve, reject) => { 
            this.db.executeSql('INSERT INTO medals (med_name, med_description, med_owner) values (?,?,?)', [name, description, owner])
            .then(() => {
                console.log('Medal created');
                resolve(createdId);
            })
            .catch((e) => {
                console.log(e);
                reject();
            });
        });
    }

    public AddPicture(image: string, medal: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.executeSql('INSERT INTO pictures (pic_image, pic_medal) values (?,?)', [image, medal])
            .then(() => {
                console.log('Picture saved')
                resolve();
            })
            .catch(e => console.log(e));
        });
    }

    private DataToMedals(result): Medal[] {
        var medals = new Array<Medal>();
        for (var i = 0; i < result.rows.length; i++) {
            var medal = undefined;
            medal = medals.find(function (med) { return med.id == result.rows.item(i).med_id});
            if (!medal) {
                medal = {
                    id: result.rows.item(i).med_id,
                    name: result.rows.item(i).med_name,
                    description: result.rows.item(i).med_description,
                    ownerId: result.rows.item(i).med_owner,
                    pictures: new Array<Picture>()
                };
                medals.push(medal);
            }
            
            if (result.rows.item(i).pic_id) {
                medal.pictures.push( {
                    id: result.rows.item(i).pic_id,
                    image: result.rows.item(i).pic_id,
                    medalId: result.rows.item(i).med_id
                });
            }
        }
        return medals;
    }

    private DataToOwnersWithMedals(result): Owner[] {
        var owners = new Array<Owner>();
        for (var i = 0; i < result.rows.length; i++) {
            var owner = owners.find(function (own) { return own.id == result.rows.item(i).own_id })
            if (!owner) {
                owner = {
                    id: result.rows.item(i).own_id,
                    lastname: result.rows.item(i).own_lastname,
                    firstname: result.rows.item(i).own_firstname,
                    description: result.rows.item(i).own_description,
                    gender: result.rows.item(i).own_gender,
                    mother: result.rows.item(i).own_mother ? result.rows.item(i).own_mother : 0,
                    father: result.rows.item(i).own_father ? result.rows.item(i).own_father : 0,
                    medals: new Array<Medal>()
                }
                owners.push(owner)
            }

            var medal = undefined;
            medal = owner.medals.find(function (med) { return med.id == result.rows.item(i).med_id});
            if (!medal) {
                medal = {
                    id: result.rows.item(i).med_id,
                    name: result.rows.item(i).med_name,
                    description: result.rows.item(i).med_description,
                    ownerId: result.rows.item(i).med_owner,
                    pictures: new Array<Picture>()
                };
                owner.medals.push(medal);
            }
            
            if (result.rows.item(i).pic_id) {
                medal.pictures.push( {
                    id: result.rows.item(i).pic_id,
                    image: result.rows.item(i).pic_id,
                    medalId: result.rows.item(i).med_id
                });
            }
        }
        return owners
    }

    private DataToOwners(result): Owner[] {
        var owners = new Array<Owner>();
        for (var i = 0; i < result.rows.length; i++) {
            var owner = {
                id: result.rows.item(i).own_id,
                lastname: result.rows.item(i).own_lastname,
                firstname: result.rows.item(i).own_firstname,
                description: result.rows.item(i).own_description,
                gender: result.rows.item(i).own_gender,
                mother: result.rows.item(i).own_mother ? result.rows.item(i).own_mother : 0,
                father: result.rows.item(i).own_father ? result.rows.item(i).own_father : 0,
                medals: new Array<Medal>()
            };
            owners.push(owner);
        }
        return owners;
    }
}