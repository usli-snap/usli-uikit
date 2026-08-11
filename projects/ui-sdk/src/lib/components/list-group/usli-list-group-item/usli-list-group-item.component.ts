import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import type { ButtonVariant } from '../../button';

@Component({
  selector: 'usli-list-group-item',
  standalone: true,
  templateUrl: './usli-list-group-item.component.html',
  styleUrl: './usli-list-group-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsliListGroupItemComponent {
  /** Highlights the item as selected */
  active = input(false);

  /** Disables interaction */
  disabled = input(false);

  /** Renders the item as a link instead of plain text */
  href = input<string | undefined>();

  /** Semantic variant applied to the item's color */
  variant = input<ButtonVariant | undefined>();

  /** Emitted when an interactive (href) item is clicked */
  itemClick = output<void>();

  protected classes = computed(() => {
    const v = this.variant();
    const variantClass = v ? ` list-group-item-usli-${v}` : '';
    const activeClass = this.active() ? ' active' : '';
    const disabledClass = this.disabled() ? ' disabled' : '';
    return `list-group-item${variantClass}${activeClass}${disabledClass}`;
  });

  protected onClick(): void {
    if (!this.disabled()) {
      this.itemClick.emit();
    }
  }
}
