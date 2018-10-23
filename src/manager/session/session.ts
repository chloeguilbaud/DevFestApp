import { Injectable } from '@angular/core';

import { Session } from '../../entities/session';
import { Sessions } from '../../providers/sessions/sessions'
import { Presentateur } from '../../entities/presentateur';
import { Presentateurs } from '../../providers';

@Injectable()
export class SessionsHandler {

    constructor(public sessions: Sessions, public presentateurs: Presentateurs) { }

    query(params?: any) {
        return new Promise((res, rej) => {
            this.sessions.query(params).subscribe((response : any) => {
                const session = [];
                for (let key in response) {
                    session.push(new Session(
                        response[key].id,
                        response[key].title,
                    ));
                }
                res(session);
            });
        });
    }

    getSession(id: Number) {
        const getSpeakers = (session: Session, speakers?) => {
            if (!speakers) return;
            return new Promise((res, rej) => {
                this.presentateurs.query().subscribe((response: any) => {
                    const speakersObject: Presentateur[] = [];
                    for (let i = 0; i < speakers.length; i++) {
                        speakersObject.push(new Presentateur(
                            response[speakers[i]].id,
                            response[speakers[i]].name,
                        ));
                    }
                    res(speakersObject);
                });
            }).then((speakers: Presentateur[]) => {
                session.presentateurs = speakers;
            });
        };
        
        return new Promise((res, rej) => {
            this.sessions.query().subscribe((response : any) => {
                for (let key in response) {
                    if (response[key].id === id) {
                        const session = new Session(
                            response[key].id,
                            response[key].title,
                            []
                        );
                        getSpeakers(session, response[key].speakers);
                        res(session);
                        break;
                    }
                }
            });
        });
    }

    add(session: Session) {
        this.sessions.add(session);
    }

    delete(session: Session) {
        this.sessions.delete(session);
    }
}