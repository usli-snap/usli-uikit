import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef,
  inject, input, signal,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { USLI_FORM_CONTROL, type UsliFormControl } from '../form-control.token';
import { ControlEventsForwarder, bindSelfAsValueAccessor } from '../../../shared/cva-self-binding';

@Component({
  selector: 'usli-input',
  standalone: true,
  templateUrl: './usli-input.component.html',
  styleUrl: './usli-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: USLI_FORM_CONTROL, useExisting: UsliInputComponent }],
})
export class UsliInputComponent implements ControlValueAccessor, UsliFormControl {
  type = input<string>('text');
  placeholder = input<string>('');
  errorMessage = input<string | undefined>();

  readonly ngControl = inject(NgControl, { optional: true, self: true });

  protected value = signal('');
  protected isDisabled = signal(false);

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private onChange: (v: string) => void = () => {};
  onTouched: () => void = () => {};

  private readonly controlEvents = new ControlEventsForwarder(this.ngControl, this.cdr, this.destroyRef);

  constructor() {
    bindSelfAsValueAccessor(this.ngControl, this);
  }

  protected hasError(): boolean {
    return !!this.errorMessage() || (!!this.ngControl?.invalid && !!this.ngControl?.touched);
  }

  protected onInput(event: Event): void {
    const v = (event.target as HTMLInputElement).value;
    this.value.set(v);
    this.onChange(v);
  }

  writeValue(value: string): void {
    this.value.set(value ?? '');
    this.controlEvents.sync();
  }

  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.isDisabled.set(isDisabled); }
}
