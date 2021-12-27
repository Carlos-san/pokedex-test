import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { AppState, selectCurrentUser } from '../store/app.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private readonly authStore: Store<AppState>,
    private readonly router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {

    return this.authStore.select(selectCurrentUser).pipe(
      map((currentUser) => {
        if(currentUser !== undefined && currentUser !== null){
          return true;
        }

        this.router.navigate(['/']);
        return false;
      })
    );

  }

}
