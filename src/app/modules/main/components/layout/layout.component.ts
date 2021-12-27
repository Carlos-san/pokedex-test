import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, mergeMap, pipe, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { logout } from 'src/app/store/user.actions';

@Component({
  selector: 'pkm-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  pageSubscription = new Subscription();

  pageTitle!: string;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authStore: Store<AppState>
  ) {
    this.getRouteData();
  }

  ngOnInit(): void {
  }

  getRouteData() : void {
    this.pageSubscription.add(
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      ).subscribe((routeData: Data) => {
        if(routeData) {
          this.pageTitle = routeData['title'] ? routeData['title']: '';
        }
      })
    );
  }

  logout() {
    this.authStore.dispatch(logout());
    this.router.navigate(['/']);
  }

}
