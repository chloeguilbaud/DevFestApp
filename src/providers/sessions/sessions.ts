import { Injectable } from '@angular/core';

import { Session } from '../../entities/session';
import { Api } from '../api/api';

@Injectable()
export class Sessions {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('sessions', params);
  }

  add(item: Session) {
  }

  delete(item: Session) {
  }

}