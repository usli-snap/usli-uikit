import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input, signal } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { USLI_FORM_CONTROL, type UsliFormControl } from '../form-control.token';
import { ControlEventsForwarder, bindSelfAsValueAccessor } from '../../../shared/cva-self-binding';

@Component({
  selector: 'usli-checkbox',
  standalone: true,
  templateUrl: './usli-checkbox.component.html',
  styleUrl: './usli-checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: USLI_FORM_CONTROL, useExisting: UsliCheckboxComponent }],
})
export class UsliCheckboxComponent implements ControlValueAccessor, UsliFormControl {
  label = input<string | undefined>();
  errorMessage = input<string | undefined>();

  readonly ngControl = inject(NgControl, { optional: true, self: true });

  protected checked = signal(false);
  protected isDisabled = signal(false);

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private onChange: (v: boolean) => void = () => {};
  onTouched: () => void = () => {};

  private readonly controlEvents = new ControlEventsForwarder(this.ngControl, this.cdr, this.destroyRef);

  constructor() {
    bindSelfAsValueAccessor(this.ngControl, this);
  }

  protected hasError(): boolean {
    return !!this.errorMessage() || (!!this.ngControl?.invalid && !!this.ngControl?.touched);
  }

  protected onToggle(event: Event): void {
    const v = (event.target as HTMLInputElement).checked;
    this.checked.set(v);
    this.onChange(v);
  }

  writeValue(value: boolean): void {
    this.checked.set(!!value);
    this.controlEvents.sync();
  }
  registerOnChange(fn: (v: boolean) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.isDisabled.set(isDisabled); }
}
