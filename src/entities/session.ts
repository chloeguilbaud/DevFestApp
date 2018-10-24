import { Presentateur } from "./presentateur";

/**
 * Class Session
 * Handle all session's features
 */
export class Session {

    id: Number;
    name: String;
    type: String;
    img; String;
    presentateurs: Presentateur[];
    description: String;

    constructor(id: Number,
                name: String,
                type: String,
                img?: String,
                presentateurs?: Presentateur[],
                description?: String
            ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.img = img;
        this.description = description;
        this.presentateurs = presentateurs;
    }
}