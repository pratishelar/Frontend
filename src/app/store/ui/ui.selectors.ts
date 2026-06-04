import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState } from './ui.reducer';

export const selectUiState = createFeatureSelector<UiState>('ui');

export const selectPageTitle = createSelector(
  selectUiState,
  (state) => state.pageTitle
);

export const selectSidebarOpen = createSelector(
  selectUiState,
  (state) => state.sidebarOpen
);
