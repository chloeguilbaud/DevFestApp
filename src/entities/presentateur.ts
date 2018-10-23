import { Session } from "./session";

export class Presentateur {

    id: Number;
    nom: String;
    bio: String;
    img: String;
    sessions: Session[];

    constructor(id: Number, nom: String, bio: String, img: String, sessions?: Session[]) {
        this.id = id;
        this.nom = nom;
        this.bio = bio;
        this.img = img;
        this.sessions = sessions;
    }
}