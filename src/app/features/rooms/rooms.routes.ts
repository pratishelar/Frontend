import { Routes } from '@angular/router';

export const roomsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./rooms-management-page.component').then(
        (m) => m.RoomsManagementPageComponent
      ),
    data: {
      title: 'Room Management',
      subtitle: 'Inventory, room status, and maintenance planning.',
    },
  },
  {
    path: 'calendar-view',
    loadComponent: () =>
      import('./pages/rooms-calendar-view-page/rooms-calendar-view-page.component').then(
        (m) => m.RoomsCalendarViewPageComponent
      ),
    data: {
      title: 'Room Management - Calendar View',
      subtitle: 'Availability grid by day and room.',
    },
  },
  {
    path: 'add-room',
    loadComponent: () =>
      import('./pages/add-room-page/add-room-page.component').then(
        (m) => m.AddRoomPageComponent
      ),
    data: {
      title: 'Add Room',
      subtitle: 'Create a room and default operating settings.',
    },
  },
  {
    path: 'view-room/:roomNo',
    loadComponent: () =>
      import('./pages/view-room-page/view-room-page.component').then(
        (m) => m.ViewRoomPageComponent
      ),
    data: {
      title: 'View Room',
      subtitle: 'Read-only room details and current status.',
    },
  },
  {
    path: 'edit-room/:roomNo',
    loadComponent: () =>
      import('./pages/edit-room-page/edit-room-page.component').then(
        (m) => m.EditRoomPageComponent
      ),
    data: {
      title: 'Edit Room',
      subtitle: 'Update status, housekeeping, and room settings.',
    },
  },
];
