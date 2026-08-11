import { Component, signal } from '@angular/core';
import { UsliPaginationComponent } from 'ui-sdk';

@Component({
  selector: 'app-pagination-docs',
  standalone: true,
  imports: [UsliPaginationComponent],
  templateUrl: './pagination-docs.html',
  styleUrl: './pagination-docs.scss',
})
export class PaginationDocs {
  protected page = signal(4);
}
