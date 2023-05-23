import { Injectable } from '@angular/core';

import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { SignInResponse } from 'appcoretruckassist';

export interface AuthState extends EntityState<SignInResponse, number> {}
@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'auth', idKey: '_id' })
export class AuthStore extends EntityStore<AuthState> {
    constructor() {
        super();
    }
}
