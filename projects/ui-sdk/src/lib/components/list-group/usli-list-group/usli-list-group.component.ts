import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'usli-list-group',
  standalone: true,
  templateUrl: './usli-list-group.component.html',
  styleUrl: './usli-list-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsliListGroupComponent {
  /** Removes outer borders/rounding for edge-to-edge lists */
  flush = input(false);

  /** Renders as an ordered list with numbered markers */
  numbered = input(false);

  /** Lays items out in a row instead of a column */
  horizontal = input(false);

  protected classes = computed(() => {
    const flushClass = this.flush() ? ' list-group-flush' : '';
    const numberedClass = this.numbered() ? ' list-group-numbered' : '';
    const horizontalClass = this.horizontal() ? ' list-group-horizontal' : '';
    return `usli-list-group list-group${flushClass}${numberedClass}${horizontalClass}`;
  });
}
