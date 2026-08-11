import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, contentChild, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { USLI_FORM_CONTROL } from '../form-control.token';

const ERROR_MESSAGES: Record<string, string> = {
  required: 'This field is required',
  email: 'Enter a valid email address',
  minlength: 'Minimum length not met',
  maxlength: 'Maximum length exceeded',
  min: 'Value is too small',
  max: 'Value is too large',
};

@Component({
  selector: 'usli-form-field',
  standalone: true,
  templateUrl: './usli-form-field.component.html',
  styleUrl: './usli-form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsliFormFieldComponent implements AfterContentInit {
  label = input<string | undefined>();

  /** Helper text shown below the control. Hidden while an error is showing. */
  hint = input<string | undefined>();

  /**
   * Renders as a Bootstrap floating label — the control before the label in
   * DOM order, with `form-floating` on the wrapper. Requires the projected
   * control to have a non-empty placeholder (even `" "`) — Bootstrap's
   * floating-label CSS keys off `:placeholder-shown`. Not meaningful for
   * checkbox/radio controls.
   */
  floating = input(false);

  private readonly control = contentChild(USLI_FORM_CONTROL);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  ngAfterContentInit(): void {
    // events (not statusChanges) — statusChanges alone misses touched-only
    // changes like markAsTouched(), which is exactly what error display depends on.
    this.control()?.ngControl?.control?.events
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.cdr.markForCheck());
  }

  protected showError(): boolean {
    const ctrl = this.control();
    return !!ctrl?.ngControl?.invalid && !!ctrl?.ngControl?.touched;
  }

  protected errorText(): string {
    const errors = this.control()?.ngControl?.errors;
    if (!errors) return '';
    const key = Object.keys(errors)[0];
    return ERROR_MESSAGES[key] ?? 'Invalid value';
  }
}
