import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'usli-input-group',
  standalone: true,
  templateUrl: './usli-input-group.component.html',
  styleUrl: './usli-input-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsliInputGroupComponent {
  /** Sizes every projected control */
  size = input<'sm' | 'lg' | undefined>();

  protected classes = computed(() => {
    const sizeClass = this.size() ? ` input-group-${this.size()}` : '';
    return `usli-input-group input-group${sizeClass}`;
  });
}
