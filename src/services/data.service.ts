import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const DATABASE_NAME: string = "myMedals.db";

@Injectable()
export class DataService {

    constructor (private sqlite: SQLite) {
        this.CreateDataBase();
    };

    private db: SQLiteObject;

    private CreateDataBase(): void {
        this.sqlite.create({
            name: DATABASE_NAME,
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            this.db = db;
            this.InitializeDataBase();
        })
        .catch(e => console.log(e));
    };

    private InitializeDataBase(): void {
        this.db.executeSql('CREATE TABLE IF NOT EXISTS medals (med_id integer primary key autoincrement, med_name text, med_description text, med_image blob, med_owner integer)', {})
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

    private GetAllMedals(): object {
        this.db.executeSql('SELECT * FROM medal LEFT OUTER JOIN owner ON medal.med_owner = owner.own_id', {})
        .then((result) => {
            if (result == null){
                return;
            }

            var medals = [];
            for (var i = 0; i < result.rows.length; i++) {
                var owner = {
                    id: result.rows.item(i).own_id ? result.rows.item(i).own_id : 0,
                    lastname: result.rows.item(i).own_lastname ? result.rows.item(i).own_lastname : "",
                    firstname: result.rows.item(i).own_firstname ? result.rows.item(i).own_firstname : ""
                };

                var medal = {
                    id: result.rows.item(i).med_id,
                    name: result.rows.item(i).med_name,
                    description: result.rows.item(i).med_description,
                    image: result.rows.item(i).med_image,
                    owner: owner
                };

                medals.push(medal);
            }

            return medals;
        })
        .catch(e => console.log(e));

        return;
    };

    private GetMedalById(id: number): object {
        this.db.executeSql('SELECT * FROM medal LEFT OUTER JOIN owner ON medal.med_owner = owner.own_id where medal.med_id = ? LIMIT 1', {id})
        .then((result) => {
            if (result == null){
                return;
            }

            var owner = {
                id: result.rows.item(0).own_id ? result.rows.item(0).own_id : 0,
                lastname: result.rows.item(0).own_lastname ? result.rows.item(0).own_lastname : "",
                firstname: result.rows.item(0).own_firstname ? result.rows.item(0).own_firstname : ""
            };

            var medal = {
                id: result.rows.item(0).med_id,
                name: result.rows.item(0).med_name,
                description: result.rows.item(0).med_description,
                image: result.rows.item(0).med_image,
                owner: owner
            };

            return medal;
        })
        .catch(e => console.log(e));

        return;
    };

    private GetMedalsByOwner(ownerId: number): object {
        this.db.executeSql('SELECT * FROM medal LEFT OUTER JOIN owner ON medal.med_owner = owner.own_id where medal.med_owner = ?', {ownerId})
        .then((result) => {
            if (result == null){
                return;
            }

            var medals = [];
            for (var i = 0; i < result.rows.length; i++) {
                var owner = {
                    id: result.rows.item(i).own_id ? result.rows.item(i).own_id : 0,
                    lastname: result.rows.item(i).own_lastname ? result.rows.item(i).own_lastname : "",
                    firstname: result.rows.item(i).own_firstname ? result.rows.item(i).own_firstname : ""
                };

                var medal = {
                    id: result.rows.item(i).med_id,
                    name: result.rows.item(i).med_name,
                    description: result.rows.item(i).med_description,
                    image: result.rows.item(i).med_image,
                    owner: owner
                };

                medals.push(medal);
            }

            return medals;
        })
        .catch(e => console.log(e));

        return;
    };

    private AddMedal(name: string, description: string, image: string, owner: number): void {
        this.db.executeSql('INSERT INTO medal (med_name, med_description, med_image, med_owner) values (?,?,?,?)', {name, description, image, owner})
        .then()
        .catch(e => console.log(e));
    };
    
    private GetAllOwners(): object {
        this.db.executeSql('SELECT * FROM owner', {})
        .then((result) => {
            if (result == null){
                return;
            }

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

            return owners;
        })
        .catch(e => console.log(e));

        return;
    };

    private GetOwnerById(id): object {
        this.db.executeSql('SELECT * FROM owner where own_id = ? LIMIT 1', {id})
        .then((result) => {
            if (result == null){
                return;
            }

            var owner = {
                id: result.rows.item(0).own_id,
                lastname: result.rows.item(0).own_lastname,
                firstname: result.rows.item(0).own_firstname,
                description: result.rows.item(0).own_description,
                gender: result.rows.item(0).own_gender,
                mother: result.rows.item(0).own_mother ? result.rows.item(0).own_mother : 0,
                father: result.rows.item(0).own_father ? result.rows.item(0).own_father : 0
            };

            return owner;
        })
        .catch(e => console.log(e));

        return;
    };

    private AddOwner(lastname: string, firstname: string, description: string, gender: number, father: number, mother: number): void {
        this.db.executeSql('INSERT INTO owner (own_lastname, own_firstname, own_description, own_gender, own_father, own_mother) values (?,?,?,?,?,?)', {lastname, firstname, description, gender, father, mother})
        .then()
        .catch(e => console.log(e));
    };

    private DeleteOwner(id): void {
        this.db.executeSql('DELETE FROM owner where own_id = ?', {id})
        .then()
        .catch(e => console.log(e));
    };

    private UpdateOwner = function (id, lastname, firstname, description, gender, father, mother) {
        this.db.executeSql('UPDATE owner set own_lastname = ?, own_firstname = ?, own_description = ?, own_gender = ?, own_father = ?, own_mother = ? where own_id = ?', {lastname, firstname, description, gender, father, mother, id})
        .then()
        .catch(e => console.log(e));
    };
}