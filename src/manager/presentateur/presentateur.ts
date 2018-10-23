import { Injectable } from '@angular/core';

import { Presentateur } from '../../entities/presentateur';
import { Presentateurs } from '../../providers';
import { Session } from '../../entities/session';
import { Sessions } from '../../providers/sessions/sessions'

@Injectable()
export class PresentateursHandler {

    constructor(public presentateurs: Presentateurs, public sessions: Sessions) { }

    query(params?: any) {
        return new Promise((res, rej) => {
            this.presentateurs.query(params).subscribe((response : any) => {
                const presentateurs = [];
                for (let key in response) {
                    presentateurs.push(new Presentateur(
                        response[key].id,
                        response[key].name,
                        response[key].bio,
                        response[key].photoUrl.indexOf('/') == 0 ? response[key].photoUrl.substring(1) : response[key].photoUrl,          
                    ));
                }
                res(presentateurs);
            });
        });
    }

    getPresentateur(id: Number) {
        const getSessions = (presentateur: Presentateur) => {
            return new Promise((res, rej) => {
                this.sessions.query().subscribe((response: any) => {
                    const sessionsObject: Session[] = [];
                    for (let key in response) {
                        const sessionSpeakers = response[key].speakers ? response[key].speakers : [];
                        for (let i = 0; i < sessionSpeakers.length; i++) {
                            if (sessionSpeakers[i] == presentateur.id) {
                                sessionsObject.push(new Session(
                                    response[key].id,
                                    response[key].title,
                                ));
                            }
                        }
                    }
                    res(sessionsObject);
                });
            }).then((sessions: Session[]) => {
                presentateur.sessions = sessions;
            });
        };
        
        return new Promise((res, rej) => {
            this.presentateurs.query().subscribe((response : any) => {
                for (let key in response) {
                    if (response[key].id === id) {
                        const presentateur = new Presentateur(
                            response[key].id,
                            response[key].name,
                            response[key].bio,
                            response[key].photoUrl.indexOf('/') == 0 ? response[key].photoUrl.substring(1) : response[key].photoUrl,     
                            []
                        );
                        getSessions(presentateur);
                        res(presentateur);
                        break;
                    }
                }
            });
        });
    }

    add(presentateur: Presentateur) {
        this.presentateurs.add(presentateur);
    }

    delete(presentateur: Presentateur) {
        this.presentateurs.delete(presentateur);
    }
}