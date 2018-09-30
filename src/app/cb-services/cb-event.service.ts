import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CbEventService {
  // Right now the purpose of this service is to keep track of global
  // stuff that might change (such as language beeing updated)
  // so that each component can listen and act accordingly all over the app

  public ANIMATIONS = {
    language: {
      state: 'inactive',
      flag: false
    },
    login: {
      state: 'inactive',
      flag: false
    }
  };

  constructor() {}

  broadcast(key: string): void {
    this.ANIMATIONS[key].state = 'active';
  }
}
