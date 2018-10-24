import { Injectable } from '@angular/core';

@Injectable()
/**
 * Database connfiguration information
 */
export class DbConf {

  public static dbName: string = "devfest.db";
  public static dbLocation: string = "default";
  public static dbCreateFromLocation: number = 1;

}
