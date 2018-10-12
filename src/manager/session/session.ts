import { Injectable } from '@angular/core';

import { Session } from '../../entities/session';
import { Sessions } from '../../providers/sessions/sessions'
import { Presentateur } from '../../entities/presentateur';

@Injectable()
export class SessionsHandler {

    constructor(public sessions: Sessions) { }

    query(params?: any) {
        return new Promise((res, rej) => {
            this.sessions.query(params).subscribe((response : any) => {
                // response.
                const test = [];
                for (let key in response) {
                    test.push(new Session(
                        response[key].title,
                        [new Presentateur('Lagaff', 'Vincent')]
                    ));
                }
                res(test);
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