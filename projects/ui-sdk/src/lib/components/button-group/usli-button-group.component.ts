import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'usli-button-group',
  standalone: true,
  templateUrl: './usli-button-group.component.html',
  styleUrl: './usli-button-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsliButtonGroupComponent {
  /** Stacks the buttons vertically instead of horizontally */
  vertical = input(false);

  /** Sizes every projected button */
  size = input<'small' | 'medium' | 'large' | undefined>();

  /** Accessible label for the group */
  ariaLabel = input('Button group');

  protected classes = computed(() => {
    const groupClass = this.vertical() ? 'btn-group-vertical' : 'btn-group';
    const sizeMap = { small: ' btn-group-sm', medium: '', large: ' btn-group-lg' } as const;
    const sizeClass = this.size() ? sizeMap[this.size()!] : '';
    return `usli-button-group ${groupClass}${sizeClass}`;
  });
}
