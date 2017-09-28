import { Platform } from 'ionic-angular';
import {Injectable} from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

// Models
import { Owner } from '../models/owner'
import { Medal } from '../models/medal'

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
            this.db.executeSql('CREATE TABLE IF NOT EXISTS medals (med_id integer primary key autoincrement, med_name text, med_description text, med_image blob, med_owner integer)', {})
        })
        .then(() => {
            console.log('Table Medals created');
            this.db.executeSql('CREATE TABLE IF NOT EXISTS owners (own_id integer primary key autoincrement, own_lastname text, own_firstname text, own_description text, own_gender text, own_father integer, own_mother integer)',{})
            .then(() => {
                console.log('Table Owners created');
            })
            .catch(e => console.log(e));        
        })
        .catch(e => console.log(e));
    };

    public GetAllOwners(): Promise<Owner[]> {
        return new Promise((resolve, reject) => {
            this.db.executeSql("select own_id, own_lastname, own_firstname, own_description, own_gender, own_mother, own_father from owners", {}).then(
                (result) => {
                    var owners = [];
                    for (var i = 0; i < result.rows.length; i++) {
                        var owner = {
                            id: result.rows.item(i).own_id,
                            lastname: result.rows.item(i).own_lastname,
                            firstname: result.rows.item(i).own_firstname,
                            description: result.rows.item(i).own_description,
                            gender: result.rows.item(i).own_gender,
                            mother: result.rows.item(i).own_mother ? result.rows.item(i).own_mother : 0,
                            father: result.rows.item(i).own_father ? result.rows.item(i).own_father : 0
                        };
                        owners.push(owner);
                    }
                    resolve(owners);
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
    };

    public DeleteOwner(id: number): Promise<void> {
        return this.db.executeSql('DELETE FROM owners WHERE own_id = ?', [id])
        .then(() => {
            console.log("Owner deleted")
        })
        .catch(e => console.log(e));
    };

    public GetAllMedals(): Promise<Medal[]> {
        return new Promise((resolve, reject) => {
            this.db.executeSql("select med_id, med_name, med_description, med_owner from medals", {}).then(
                (result) => {
                    var medals = [];
                    for (var i = 0; i < result.rows.length; i++) {
                        var medal = {
                            id: result.rows.item(i).med_id,
                            name: result.rows.item(i).med_name,
                            descriptio: result.rows.item(i).med_description,
                            ownerId: result.rows.item(i).med_owner
                        };
                        medals.push(medal);
                    }
                    resolve(medals);
                }
            );
        });
    }

    public GetMedalsByOwner(ownerId: number): Promise<Medal[]> {
        return new Promise((resolve, reject) => {
            this.db.executeSql("select med_id, med_name, med_description, med_owner from medals where med_owner = ?", {ownerId}).then(
                (result) => {
                    var medals = [];
                    for (var i = 0; i < result.rows.length; i++) {
                        var medal = {
                            id: result.rows.item(i).med_id,
                            name: result.rows.item(i).med_name,
                            descriptio: result.rows.item(i).med_description,
                            ownerId: result.rows.item(i).med_owner
                        };
                        medals.push(medal);
                    }
                    resolve(medals);
                }
            );
        });
    }
}