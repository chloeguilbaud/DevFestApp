import { Injectable } from '@angular/core';

import { Session } from '../../entities/session';
import { Sessions } from '../../providers/sessions/sessions'
import { Presentateur } from '../../entities/presentateur';
import { Presentateurs } from '../../providers';
import { QueryErrorHandler } from '../error.handler/query.error.handler';
import { ErrorAlertHandler } from '../error.handler/error.alert.handler';

/**
 * Class SessionHandler
 * 
 * Handle all call to get or put Session's objects
 */
@Injectable()
export class SessionsHandler {

    constructor(public sessions: Sessions,
                public presentateurs: Presentateurs,
                public queryErrorHandler: QueryErrorHandler,
                public alertHandler: ErrorAlertHandler) {}

    /**
     * Query
     * 
     * Request all Sessions
     * @param params 
     */
    query(params?: any) {
        return new Promise((res, rej) => {
            this.sessions.query(params).subscribe((response : any) => {
                const session = [];
                for (let key in response) {
                    session.push(new Session(
                        response[key].id,
                        response[key].title,
                        response[key].type,
                        response[key].image,
                        [],
                        response[key].description,
                    ));
                }
                res(session);
            }, (err) => {
                this.queryErrorHandler.handle(err);
            });
        }).catch((err) => {
            this.alertHandler.presentAlert("Aie","Impossible de récupérer la liste des alertes","Ok");
        });
    }

    /**
     * getSession
     * 
     * Request a single session with depth 2
     * @param id    Session id needed
     */
    getSession(id: Number) {
        // Function to get presentateur for sessions
        const getSpeakers = (session: Session, speakers?) => {
            if (!speakers) return;
            return new Promise((res, rej) => {
                this.presentateurs.query().subscribe((response: any) => {
                    const speakersObject: Presentateur[] = [];
                    for (let i = 0; i < speakers.length; i++) {
                        speakersObject.push(new Presentateur(
                            response[speakers[i]].id,
                            response[speakers[i]].name,
                            response[speakers[i]].bio,
                            response[speakers[i]].photoUrl.indexOf('/') == 0 ? response[speakers[i]].photoUrl.substring(1) : response[speakers[i]].photoUrl,     
                        ));
                    }
                    res(speakersObject);
                }, (err) => {
                    this.queryErrorHandler.handle(err);
                });
            }).then((speakers: Presentateur[]) => {
                session.presentateurs = speakers;
            }).catch((err) => {
                this.alertHandler.presentAlert("Aie","Impossible de récupérer l'alerte","Ok");
            });
        };
        
        // Get all sessions objects and pick the one needed
        return new Promise((res, rej) => {
            this.sessions.query().subscribe((response : any) => {
                for (let key in response) {
                    if (response[key].id === id) {
                        const session = new Session(
                            response[key].id,
                            response[key].title,
                            response[key].type,
                            response[key].image,
                            [],
                            response[key].description,
                        );
                        getSpeakers(session, response[key].speakers);
                        res(session);
                        break;
                    }
                }
            }, (err) => {
                this.queryErrorHandler.handle(err);
            });
        }).catch((err) => {
            this.alertHandler.presentAlert("Aie","Impossible de récupérer la liste d'alerte","Ok");
        });
    }

    /**
     * add
     * 
     * Add a session to the API
     * @param session Session
     */
    add(session: Session) {
        this.sessions.add(session);
    }

    /**
     * delete
     * 
     * Remove a Session from the API
     * @param session Session
     */
    delete(session: Session) {
        this.sessions.delete(session);
    }
}