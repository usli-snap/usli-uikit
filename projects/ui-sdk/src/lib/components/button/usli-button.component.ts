import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success';

@Component({
  selector: 'usli-button',
  standalone: true,
  templateUrl: './usli-button.component.html',
  styleUrl: './usli-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsliButtonComponent {
  /** Primary (filled) vs secondary (outlined) variant — deprecated in favour of `variant` */
  primary = input(false);

  /** Semantic variant; takes precedence over the `primary` boolean when set */
  variant = input<ButtonVariant | undefined>(undefined);

  /** Button size */
  size = input<'small' | 'medium' | 'large'>('medium');

  /** Label text — used when no content is projected */
  label = input('Button');

  /** Override the background color */
  backgroundColor = input<string | undefined>();

  /** Disabled state */
  disabled = input(false);

  /** Emits the native MouseEvent on click */
  clicked = output<MouseEvent>();

  protected classes = computed(() => {
    const v       = this.variant() ?? (this.primary() ? 'primary' : 'secondary');
    const sizeMap = { small: 'btn-sm', medium: '', large: 'btn-lg' } as const;
    const bsSize  = sizeMap[this.size()];
    return `usli-button btn ${bsSize} usli-button--${v} btn-usli-${v}`.trim().replace(/\s+/g, ' ');
  });
}
