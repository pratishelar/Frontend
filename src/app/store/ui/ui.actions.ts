import { createAction, props } from '@ngrx/store';

export const setPageTitle = createAction(
  '[UI] Set Page Title',
  props<{ title: string }>()
);

export const toggleSidebar = createAction('[UI] Toggle Sidebar');
