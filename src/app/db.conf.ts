import { Injectable } from '@angular/core';

@Injectable()
/**
 * Database connfiguration information
 */
export class DbConf {

  public static databasename: string = "devfest.db";
  public static location: string = "default";

}
