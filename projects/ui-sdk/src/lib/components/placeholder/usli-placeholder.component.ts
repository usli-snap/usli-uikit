import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'usli-placeholder',
  standalone: true,
  templateUrl: './usli-placeholder.component.html',
  styleUrl: './usli-placeholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsliPlaceholderComponent {
  /** CSS width of the skeleton — e.g. '100%', '6rem', 120 */
  width = input<string | number>('100%');

  /** Bootstrap placeholder size */
  size = input<'xs' | 'sm' | 'lg' | undefined>();

  /** Shimmer animation */
  animation = input<'glow' | 'wave' | undefined>();

  /** Renders as a block-level element so multiple placeholders stack as lines */
  block = input(false);

  protected classes = computed(() => {
    const sizeClass = this.size() ? ` placeholder-${this.size()}` : '';
    const animationClass = this.animation() ? ` placeholder-${this.animation()}` : '';
    const blockClass = this.block() ? ' d-block' : '';
    return `usli-placeholder placeholder${sizeClass}${animationClass}${blockClass}`;
  });

  protected style = computed(() => {
    const w = this.width();
    return { width: typeof w === 'number' ? `${w}px` : w };
  });
}
