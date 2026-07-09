import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./layout/pms-shell.component').then((m) => m.PmsShellComponent),
		children: [
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full',
			},
			{
				path: 'dashboard',
				loadChildren: () =>
					import('./features/dashboard/dashboard.routes').then(
						(m) => m.dashboardRoutes
					),
			},
			{
				path: 'reservations',
				loadChildren: () =>
					import('./features/reservations/reservations.routes').then(
						(m) => m.reservationsRoutes
					),
			},
			{
				path: 'check-in',
				loadChildren: () =>
					import('./features/check-in/check-in.routes').then(
						(m) => m.checkInRoutes
					),
			},
			{
				path: 'check-out',
				loadChildren: () =>
					import('./features/check-out/check-out.routes').then(
						(m) => m.checkOutRoutes
					),
			},
			{
				path: 'rooms',
				loadChildren: () =>
					import('./features/rooms/rooms.routes').then((m) => m.roomsRoutes),
			},
			{
				path: 'rates',
				loadChildren: () =>
					import('./features/rates/rates.routes').then((m) => m.ratesRoutes),
			},
			{
				path: 'guests',
				loadChildren: () =>
					import('./features/guests/guests.routes').then((m) => m.guestsRoutes),
			},
			{
				path: 'reports',
				loadChildren: () =>
					import('./features/reports/reports.routes').then((m) => m.reportsRoutes),
			},
			{
				path: 'housekeeping',
				loadComponent: () =>
					import('./shared/section-stub/section-stub.component').then(
						(m) => m.SectionStubComponent
					),
				data: {
					title: 'Housekeeping',
				},
			},
		],
	},
	{
		path: '**',
		redirectTo: 'dashboard',
	},
];
