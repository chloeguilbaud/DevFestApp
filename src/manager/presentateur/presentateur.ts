import { Injectable } from '@angular/core';

import { Presentateur } from '../../entities/presentateur';
import { Presentateurs } from '../../providers';
import { Session } from '../../entities/session';
import { Sessions } from '../../providers/sessions/sessions'
import { QueryErrorHandler } from '../error.handler/query.error.handler';
import { ErrorAlertHandler } from '../error.handler/error.alert.handler';

/**
 * Class PresentateursHandler
 * 
 * Handle all call to get or put Presentateur's objects
 */
@Injectable()
export class PresentateursHandler {

    constructor(public presentateurs: Presentateurs,
                public sessions: Sessions,
                public queryErrorHandler: QueryErrorHandler,
                public alertHandler: ErrorAlertHandler) {}

    /**
     * Query
     * 
     * Request all presentateurs
     * @param params 
     */
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
            }, (err) => {
                this.queryErrorHandler.handle(err);
            });
        }).catch((err) => {
            this.alertHandler.presentAlert("Aie", "Impossible de récupérer la liste des présentateurs", "Ok");
        });
    }

    /**
     * getPresentateur
     * 
     * Request a single presentateur with depth 2
     * @param id    PresentateurId
     */
    getPresentateur(id: Number) {
        // Function to get session for presentateur
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
                                    response[key].type,
                                    response[key].image,
                                    [],
                                    response[key].description,
                                ));
                            }
                        }
                    }
                    res(sessionsObject);
                }, (err) => {
                    this.queryErrorHandler.handle(err);
                });
            }).then((sessions: Session[]) => {
                presentateur.sessions = sessions;
            }).catch((err) => {
                this.alertHandler.presentAlert("Aie", "Impossible de récupérer les informations du présentateur", "Ok");
            });
        };
        
        // Get all presentateur objects and pick the one needed
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
        }).catch((err) => {
            this.alertHandler.presentAlert("Aie", "Impossible de récupérer les informations des présentateurs", "Ok");
        });
    }

    /**
     * add
     * 
     * Add presentateur to API
     * @param presentateur Presentateur
     */
    add(presentateur: Presentateur) {
        this.presentateurs.add(presentateur);
    }

    /**
     * delete
     * 
     * Delete presentateur from API
     * @param presentateur Presentateur
     */
    delete(presentateur: Presentateur) {
        this.presentateurs.delete(presentateur);
    }
}