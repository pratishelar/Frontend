import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { setPageTitle } from '../store/ui/ui.actions';
import { selectPageTitle } from '../store/ui/ui.selectors';

interface NavItem {
  label: string;
  path: string;
  iconClass: string;
}

@Component({
  selector: 'app-pms-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './pms-shell.component.html',
  styleUrl: './pms-shell.component.css',
})
export class PmsShellComponent {
  readonly navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', iconClass: 'bi-grid-1x2-fill' },
    { label: 'Reservations', path: '/reservations', iconClass: 'bi-calendar-check' },
    { label: 'Room Management', path: '/rooms', iconClass: 'bi-door-open' },
    { label: 'Rate Management', path: '/rates', iconClass: 'bi-cash-stack' },
    { label: 'Promo Codes', path: '/rates/promo-codes', iconClass: 'bi-ticket-perforated' },
    { label: 'Guest Profiles', path: '/guests', iconClass: 'bi-people-fill' },
    { label: 'Reports', path: '/reports', iconClass: 'bi-bar-chart-line-fill' },
    { label: 'Housekeeping', path: '/housekeeping', iconClass: 'bi-brush-fill' },
  ];

  readonly pageTitle$;
  showTopCta = true;
  topCtaLabel = 'New Reservation';
  topCtaLink = '/reservations/step-1-guest';
  topCtaIcon = 'bi-plus-lg';
  isRoomsRoute = false;
  isRoomsCalendarView = false;
  readonly todayLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date());

  constructor(
    private readonly router: Router,
    private readonly store: Store
  ) {
    this.pageTitle$ = this.store.select(selectPageTitle);
    this.updatePageTitle();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updatePageTitle());
  }

  isNavItemActive(item: NavItem): boolean {
    const currentPath = this.router.url.split('?')[0].split('#')[0];

    if (item.path === '/rates') {
      return currentPath.startsWith('/rates') && !this.isPromoRoute(currentPath);
    }

    if (item.path === '/rates/promo-codes') {
      return this.isPromoRoute(currentPath);
    }

    if (item.path === '/dashboard') {
      return currentPath === '/dashboard';
    }

    return currentPath === item.path || currentPath.startsWith(`${item.path}/`);
  }

  private isPromoRoute(path: string): boolean {
    return (
      path.startsWith('/rates/promo-codes') ||
      path.startsWith('/rates/add-promo-code') ||
      path.startsWith('/rates/view-promo-code') ||
      path.startsWith('/rates/edit-promo-code')
    );
  }

  private updatePageTitle(): void {
    let snapshot = this.router.routerState.snapshot.root;

    while (snapshot.firstChild) {
      snapshot = snapshot.firstChild;
    }

    this.store.dispatch(
      setPageTitle({ title: snapshot.data?.['title'] ?? 'PMS Module 1' })
    );

    if (this.router.url.startsWith('/reservations/step-')) {
      // Hide top-right CTA while inside the multi-step reservation wizard.
      this.showTopCta = false;
      this.isRoomsRoute = false;
      this.isRoomsCalendarView = false;
      return;
    }

    if (this.router.url.startsWith('/rooms')) {
      this.showTopCta = true;
      this.isRoomsRoute = true;
      this.isRoomsCalendarView = this.router.url.startsWith('/rooms/calendar-view');
      this.topCtaLabel = 'Add Room';
      this.topCtaLink = '/rooms/add-room';
      this.topCtaIcon = 'bi-plus-circle';
      return;
    }

    if (this.router.url.startsWith('/rates')) {
      this.showTopCta = true;
      this.isRoomsRoute = false;
      this.isRoomsCalendarView = false;
      this.topCtaLabel = this.router.url.startsWith('/rates/promo-codes')
        ? 'Add Promo Code'
        : 'New Rate Plan';
      this.topCtaLink = this.router.url.startsWith('/rates/promo-codes')
        ? '/rates/add-promo-code'
        : '/rates/new-rate-plan';
      this.topCtaIcon = 'bi-plus-circle';
      return;
    }

    if (this.router.url.startsWith('/guests')) {
      this.showTopCta = true;
      this.isRoomsRoute = false;
      this.isRoomsCalendarView = false;
      this.topCtaLabel = 'Add Guest';
      this.topCtaLink = '/guests/add-guest';
      this.topCtaIcon = 'bi-plus-circle';
      return;
    }

    if (this.router.url.startsWith('/reports')) {
      this.showTopCta = true;
      this.isRoomsRoute = false;
      this.isRoomsCalendarView = false;
      this.topCtaLabel = 'New Report';
      this.topCtaLink = '/reports/new-report';
      this.topCtaIcon = 'bi-plus-circle';
      return;
    }

    this.showTopCta = true;
    this.isRoomsRoute = false;
    this.isRoomsCalendarView = false;
    this.topCtaLabel = 'New Reservation';
    this.topCtaLink = '/reservations/step-1-guest';
    this.topCtaIcon = 'bi-plus-lg';
  }
}
