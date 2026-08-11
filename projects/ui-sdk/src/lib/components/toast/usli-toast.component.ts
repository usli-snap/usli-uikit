import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal } from '@angular/core';
import type { AlertVariant } from '../alert';

@Component({
  selector: 'usli-toast',
  standalone: true,
  templateUrl: './usli-toast.component.html',
  styleUrl: './usli-toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsliToastComponent {
  /** Semantic variant */
  variant = input<AlertVariant>('info');

  /** Optional heading rendered above the projected content */
  title = input<string | undefined>();

  /** Automatically dismisses the toast after `delay` ms */
  autohide = input(true);

  /** Autohide delay in milliseconds */
  delay = input(5000);

  /** Shows a close button that hides the toast */
  dismissible = input(true);

  /** Emitted when the toast hides, whether by timer or the close button */
  dismissed = output<void>();

  protected visible = signal(true);

  protected classes = computed(() => `usli-toast toast show alert-usli-${this.variant()}`);

  constructor() {
    effect((onCleanup) => {
      if (!this.autohide()) return;
      const timer = setTimeout(() => this.dismiss(), this.delay());
      onCleanup(() => clearTimeout(timer));
    });
  }

  protected dismiss(): void {
    this.visible.set(false);
    this.dismissed.emit();
  }
}
