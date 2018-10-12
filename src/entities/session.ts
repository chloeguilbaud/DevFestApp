import { Presentateur } from "./presentateur";

export class Session {

    name: String;
    presentateurs: Presentateur[];

    constructor(name: String, presentateurs?: Presentateur[]) {
        this.name = name;
        this.presentateurs = presentateurs;
    }
}