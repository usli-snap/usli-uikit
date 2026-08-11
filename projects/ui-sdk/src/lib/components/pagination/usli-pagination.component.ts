import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';

function range(start: number, end: number): number[] {
  if (end < start) return [];
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

@Component({
  selector: 'usli-pagination',
  standalone: true,
  templateUrl: './usli-pagination.component.html',
  styleUrl: './usli-pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsliPaginationComponent {
  /** Total number of pages */
  totalPages = input.required<number>();

  /** Current page (1-indexed). Two-way bindable via [(page)] */
  page = model(1);

  /** Number of pages shown on each side of the current page */
  siblingCount = input(1);

  /** Number of pages always shown at the start and end */
  boundaryCount = input(1);

  /** Disables all interaction */
  disabled = input(false);

  protected items = computed<(number | 'ellipsis')[]>(() => {
    const total = Math.max(0, this.totalPages());
    const current = this.page();
    const siblingCount = this.siblingCount();
    const boundaryCount = this.boundaryCount();

    const startPages = range(1, Math.min(boundaryCount, total));
    const endPages = range(Math.max(total - boundaryCount + 1, boundaryCount + 1), total);

    const siblingsStart = Math.max(
      Math.min(current - siblingCount, total - boundaryCount - siblingCount * 2 - 1),
      boundaryCount + 2,
    );
    const siblingsEnd = Math.min(
      Math.max(current + siblingCount, boundaryCount + siblingCount * 2 + 2),
      endPages.length > 0 ? endPages[0] - 2 : total - 1,
    );

    const middle: (number | 'ellipsis')[] = [
      ...(siblingsStart > boundaryCount + 2
        ? (['ellipsis'] as const)
        : boundaryCount + 1 < total - boundaryCount + 1
          ? [boundaryCount + 1]
          : []),
      ...range(siblingsStart, siblingsEnd),
      ...(siblingsEnd < total - boundaryCount - 1
        ? (['ellipsis'] as const)
        : total - boundaryCount > boundaryCount
          ? [total - boundaryCount]
          : []),
    ];

    const seen = new Set<number>();
    return [...startPages, ...middle, ...endPages].filter((item) => {
      if (item === 'ellipsis') return true;
      if (seen.has(item)) return false;
      seen.add(item);
      return true;
    });
  });

  protected goTo(target: number): void {
    if (this.disabled() || target < 1 || target > this.totalPages() || target === this.page()) return;
    this.page.set(target);
  }
}
