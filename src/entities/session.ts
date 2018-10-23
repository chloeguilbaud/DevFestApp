import { Presentateur } from "./presentateur";

export class Session {

    id: Number;
    name: String;
    presentateurs: Presentateur[];

    constructor(id: Number, name: String, presentateurs?: Presentateur[]) {
        this.id = id;
        this.name = name;
        this.presentateurs = presentateurs;
    }
}