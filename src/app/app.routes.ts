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
				children: [
					{
						path: '',
						loadComponent: () =>
							import('./shared/section-stub/section-stub.component').then(
								(m) => m.SectionStubComponent
							),
						data: {
							title: 'Rate Management',
						},
					},
					{
						path: 'new-rate-plan',
						loadComponent: () =>
							import('./shared/section-stub/section-stub.component').then(
								(m) => m.SectionStubComponent
							),
						data: {
							title: 'New Rate Plan',
						},
					},
					{
						path: 'add-promo-code',
						loadComponent: () =>
							import('./shared/section-stub/section-stub.component').then(
								(m) => m.SectionStubComponent
							),
						data: {
							title: 'Add Promo Code',
						},
					},
				],
			},
			{
				path: 'guests',
				children: [
					{
						path: '',
						loadComponent: () =>
							import('./shared/section-stub/section-stub.component').then(
								(m) => m.SectionStubComponent
							),
						data: {
							title: 'Guest Profiles',
						},
					},
					{
						path: 'add-guest',
						loadComponent: () =>
							import('./shared/section-stub/section-stub.component').then(
								(m) => m.SectionStubComponent
							),
						data: {
							title: 'Add Guest',
						},
					},
				],
			},
			{
				path: 'reports',
				loadComponent: () =>
					import('./shared/section-stub/section-stub.component').then(
						(m) => m.SectionStubComponent
					),
				data: {
					title: 'Reports',
				},
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
