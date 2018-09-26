import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CbStorageService } from './cb-storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class CbAuthgardService implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private _CbStorageService: CbStorageService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._CbStorageService.isAuthenticated()) {
      console.log('Not Authentified -> redirecting to login');
      this.router.navigate(['']);
      return false;
    } else {
      console.log('Authentified -> proceed');
      // this.router.navigate(['/cryptobo4rd/dashboard']);
      return true;
    }
  }

  canActivateChild() {
    console.log('Check child route access');
    return true;
  }
}
