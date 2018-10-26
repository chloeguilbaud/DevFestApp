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

  saveSessionImage(sessionId: Number, imgData: string) {
    console.info("DB Manager - saving session", sessionId, "image.");
    return this.storage.set(DbManager.storagePreSessionImg + sessionId, imgData);
  }

  getSessionImage(sessionId: Number) {
    console.info("DB Manager - getting session", sessionId, "image.");
    return this.storage.get(DbManager.storagePreSessionImg + sessionId);
  }

  saveSessionNote(sessionId: Number, imgData: string) {
    console.info("DB Manager - saving session", sessionId, "note.");
    return this.storage.set(DbManager.storagePreSessionNote + sessionId, imgData);
  }

  getSessionNote(sessionId: Number) {
    console.info("DB Manager - getting session", sessionId, "note.");
      return this.storage.get(DbManager.storagePreSessionNote + sessionId)
  }

}