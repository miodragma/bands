import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import * as fromApp from 'app/shared/store/app.reducers';
import * as fromBands from '../components/bands/shared/store/bands.reducers';

@Injectable()
export class GuardService implements CanActivate {

  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('bands')
      // .take(1)
      .map((isBand: fromBands.State) => {
        if (!isBand.isAboutBand) {
          this.router.navigate(['/']);
        }
        return isBand.isAboutBand;
      });
  }

}
