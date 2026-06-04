import { createReducer, on } from '@ngrx/store';
import { setPageTitle, toggleSidebar } from './ui.actions';

export interface UiState {
  pageTitle: string;
  sidebarOpen: boolean;
}

export const initialUiState: UiState = {
  pageTitle: 'PMS Module 1',
  sidebarOpen: true,
};

export const uiReducer = createReducer(
  initialUiState,
  on(setPageTitle, (state, { title }) => ({ ...state, pageTitle: title })),
  on(toggleSidebar, (state) => ({ ...state, sidebarOpen: !state.sidebarOpen }))
);
