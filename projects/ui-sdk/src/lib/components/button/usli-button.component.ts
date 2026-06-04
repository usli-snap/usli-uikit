import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'usli-button',
  standalone: true,
  templateUrl: './usli-button.component.html',
  styleUrl: './usli-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsliButtonComponent {
  /** Primary (filled) vs secondary (outlined) variant */
  primary = input(false);

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
    const variant  = this.primary() ? 'usli-button--primary btn-usli-primary' : 'usli-button--secondary btn-usli-secondary';
    const sizeMap  = { small: 'btn-sm', medium: '', large: 'btn-lg' } as const;
    const bsSize   = sizeMap[this.size()];
    return `usli-button btn ${bsSize} ${variant}`.trim().replace(/\s+/g, ' ');
  });
}
