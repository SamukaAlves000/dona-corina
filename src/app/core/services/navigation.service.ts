import { Injectable, signal, computed } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NAV_META } from '../models/nav.model';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  readonly currentRoute = signal<string>('dashboard');

  readonly currentMeta = computed(() => {
    const key = this.currentRoute();
    return NAV_META[key] ?? NAV_META['dashboard'];
  });

  readonly topNum = computed(() => this.currentMeta().num);
  readonly topTitle = computed(() => this.currentMeta().title);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const seg = e.urlAfterRedirects.replace(/^\//, '').split('/')[0] || 'dashboard';
        this.currentRoute.set(seg);
      });
  }

  go(route: string): void {
    this.router.navigate(['/' + route]);
  }
}
