import { Session } from "./session";

/**
 * Class Presentateur
 * Handle all speaker's features
 */
export class Presentateur {

    id: Number;
    nom: string;
    bio: string;
    img: string;
    sessions: Session[];

    constructor(id: Number, nom: string, bio: string, img: string, sessions?: Session[]) {
        this.id = id;
        this.nom = nom;
        this.bio = bio;
        this.img = img;
        this.sessions = sessions;
    }
}