import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export interface UsliBreadcrumbItem {
  label: string;
  href?: string;
}

@Component({
  selector: 'usli-breadcrumb',
  standalone: true,
  templateUrl: './usli-breadcrumb.component.html',
  styleUrl: './usli-breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsliBreadcrumbComponent {
  /** Ordered list of crumbs — the last item renders as the current page, never as a link */
  items = input.required<UsliBreadcrumbItem[]>();

  /** Emitted when a non-current crumb with an href is clicked */
  itemClick = output<UsliBreadcrumbItem>();
}
