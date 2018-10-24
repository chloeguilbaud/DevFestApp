import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
/**
 * Database manager
 */
export class DbManager {

  private static storagePreSessionImg: string = "session_img_";
  private static storagePreSessionNote: string = "session_note_";

  constructor(private storage: Storage) {  }

  saveSessionImage(sessionId: number, imgData: string) {
    this.storage.set(DbManager.storagePreSessionImg + sessionId, imgData);
  }

  getSessionImage(sessionId: number) {
    return this.storage.get(DbManager.storagePreSessionImg + sessionId);
  }

  saveSessionNote(sessionId: number, imgData: string) {
    this.storage.set(DbManager.storagePreSessionNote + sessionId, imgData);
  }

  getSessionNote(sessionId: number) {
    return this.storage.get(DbManager.storagePreSessionNote + sessionId);
  }

}





























/*import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import {DbConf} from "../app/db.conf";

@Injectable()
export class DbManager {

  theConsole: string = "Console Messages";

  options: any = {
    name: DbConf.dbName,
    location: DbConf.dbLocation,
    createFromLocation: DbConf.dbCreateFromLocation
  };

  private db: SQLiteObject;

  constructor(private sqlite: SQLite) {

    console.info("BASE DE DONNEES INIT");
    this.connectToDb();

  }

  private connectToDb():void {

    this.sqlite.create(this.options)
      .then((db: SQLiteObject) => {

        this.db = db;
        let sql = 'create table IF NOT EXISTS `notes` (session INTEGER, note VARCHAR(255), img VARCHAR(255))';
        //IF you move the below statment out of here then the db variable will not be initialized
        //before you can use it to execute the SQL.
        this.db.executeSql(sql)
          .then(() => this.theConsole += 'Executed SQL' + sql)
          .catch(e => this.theConsole += "Error: " + JSON.stringify(e));
      })
      .catch(e => this.theConsole += JSON.stringify(e));

  }

  addUser(username, password):void {

    let sql = "INSERT INTO `user` (username,password) VALUES ('"+username+"','"+ password+"')";

    this.db.executeSql(sql)
      .then(() => this.theConsole += "\n" + 'Executed SQL' + sql)
      .catch(e => this.theConsole += "Error: " + JSON.stringify(e));


  }

  getDealer() {

    let sql = "SELECT * FROM user";

    this.db.executeSql(sql)
      .then((result) => {
        this.theConsole += JSON.stringify(result);
        if (result.rows.length > 0) {
          this.theConsole += 'Result' + result.rows.item(0);
        }
        this.theConsole += "\n" + result.rows.item(0).username+ result.rows.item(0).password;
        this.theConsole +=  "\n" +'Rows' + result.rows.length;

      })

      .catch(e => this.theConsole += JSON.stringify(e));
  }

  getConsoleMessages() {
    return this.theConsole;
  }

  /*constructor(private sqlite: SQLite) {

    this.init();

    /*this.sqlite.create({
      name: DbConf.databasename,
      location: DbConf.location
    })
      .then((db: SQLiteObject) => {

        console.log(db);
        /*db.executeSql('create table danceMoves(name VARCHAR(32))', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));*/


      /*})
      .catch(e => console.log(e));*/


  //}

  /*init() {
    this.sqlite.selfTest().then((res: boolean) => console.log("call BD 1", res)).catch((err) => {
      console.log("err DB 1", err);
    });
    this.sqlite.create({
      name: DbConf.databasename,
      location: DbConf.location
    }).then((db: SQLiteObject) => {

        console.log("base de données", db);
/*      db.executeSql('create table danceMoves(name VARCHAR(32))', {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));*/


    /*})
      .catch(e => console.log(e));
    this.sqlite.selfTest().then((res: boolean) => console.log("call BD 2", res));
    this.sqlite.c

  }

}*/
