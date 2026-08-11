import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input, signal } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { USLI_FORM_CONTROL, type UsliFormControl } from '../form-control.token';
import { ControlEventsForwarder, bindSelfAsValueAccessor } from '../../../shared/cva-self-binding';

@Component({
  selector: 'usli-range',
  standalone: true,
  templateUrl: './usli-range.component.html',
  styleUrl: './usli-range.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: USLI_FORM_CONTROL, useExisting: UsliRangeComponent }],
})
export class UsliRangeComponent implements ControlValueAccessor, UsliFormControl {
  min = input(0);
  max = input(100);
  step = input(1);
  errorMessage = input<string | undefined>();

  /** Shows the live numeric value next to the slider */
  showValue = input(false);

  readonly ngControl = inject(NgControl, { optional: true, self: true });

  protected value = signal(0);
  protected isDisabled = signal(false);

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private onChange: (v: number) => void = () => {};
  onTouched: () => void = () => {};

  private readonly controlEvents = new ControlEventsForwarder(this.ngControl, this.cdr, this.destroyRef);

  constructor() {
    bindSelfAsValueAccessor(this.ngControl, this);
  }

  protected hasError(): boolean {
    return !!this.errorMessage() || (!!this.ngControl?.invalid && !!this.ngControl?.touched);
  }

  protected onInput(event: Event): void {
    const v = Number((event.target as HTMLInputElement).value);
    this.value.set(v);
    this.onChange(v);
  }

  writeValue(value: number): void {
    this.value.set(value ?? 0);
    this.controlEvents.sync();
  }

  registerOnChange(fn: (v: number) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.isDisabled.set(isDisabled); }
}
