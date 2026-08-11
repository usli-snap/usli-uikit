import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { ButtonVariant } from '../button';

@Component({
  selector: 'usli-progress',
  standalone: true,
  templateUrl: './usli-progress.component.html',
  styleUrl: './usli-progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsliProgressComponent {
  /** Current value */
  value = input.required<number>();

  /** Value representing 100% */
  max = input(100);

  /** Semantic variant applied to the bar's color */
  variant = input<ButtonVariant | undefined>();

  /** Adds diagonal stripes to the bar */
  striped = input(false);

  /** Animates the stripes — implies striped */
  animated = input(false);

  /** Text rendered inside the bar */
  label = input<string | undefined>();

  /** Shows the percentage inside the bar when no label is set */
  showLabel = input(false);

  protected percent = computed(() => {
    const max = this.max();
    return max > 0 ? Math.min(100, Math.max(0, (this.value() / max) * 100)) : 0;
  });

  protected barClasses = computed(() => {
    const v = this.variant();
    const variantClass = v ? ` progress-bar-usli-${v}` : '';
    const stripedClass = this.striped() || this.animated() ? ' progress-bar-striped' : '';
    const animatedClass = this.animated() ? ' progress-bar-animated' : '';
    return `progress-bar${variantClass}${stripedClass}${animatedClass}`;
  });

  protected barText = computed(() => this.label() ?? (this.showLabel() ? `${Math.round(this.percent())}%` : ''));
}
