import { Session } from "./session";

export class Presentateur {

    id: Number;
    nom: String;
    sessions: Session[];

    constructor(id: Number, nom: String, sessions?: Session[]) {
        this.id = id;
        this.nom = nom;
        this.sessions = sessions;
    }
}