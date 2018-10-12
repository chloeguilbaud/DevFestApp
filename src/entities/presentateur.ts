import { Session } from "./session";

export class Presentateur {

    nom: String;
    prenom: String;
    sessions: Session[];

    constructor(nom: String, prenom: String, sessions?: Session[]) {
        this.nom = nom;
        this.prenom = prenom;
        this.sessions = sessions;
    }
}