import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.css',
})
export class TablePaginationComponent {
  @Input({ required: true }) summary = '';
  @Input({ required: true }) pageSizes: string[] = [];
  @Input({ required: true }) selectedPageSize = '10';
  @Input({ required: true }) currentPage = 1;
  @Input({ required: true }) totalPages = 1;

  @Output() pageSizeChange = new EventEmitter<string>();
  @Output() previousPage = new EventEmitter<void>();
  @Output() nextPage = new EventEmitter<void>();

  get canPrevious(): boolean {
    return this.currentPage > 1;
  }

  get canNext(): boolean {
    return this.currentPage < this.totalPages;
  }

  onPageSizeChange(value: string): void {
    this.pageSizeChange.emit(value);
  }
}
