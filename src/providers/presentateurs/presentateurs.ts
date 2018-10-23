import { Injectable } from '@angular/core';

import { Presentateur } from '../../entities/presentateur';
import { Api } from '../api/api';

@Injectable()
export class Presentateurs {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('speakers', params);
  }

  add(item: Presentateur) {
  }

  delete(item: Presentateur) {
  }

}