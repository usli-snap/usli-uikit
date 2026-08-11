import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, computed, inject, input, signal } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { USLI_FORM_CONTROL, type UsliFormControl } from '../form-control.token';
import { USLI_RADIO_GROUP, type UsliRadioGroupControl } from '../radio-group.token';
import { ControlEventsForwarder, bindSelfAsValueAccessor } from '../../../shared/cva-self-binding';

@Component({
  selector: 'usli-radio-group',
  standalone: true,
  templateUrl: './usli-radio-group.component.html',
  styleUrl: './usli-radio-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: USLI_FORM_CONTROL, useExisting: UsliRadioGroupComponent },
    { provide: USLI_RADIO_GROUP, useExisting: UsliRadioGroupComponent },
  ],
})
export class UsliRadioGroupComponent implements ControlValueAccessor, UsliFormControl, UsliRadioGroupControl {
  errorMessage = input<string | undefined>();

  readonly ngControl = inject(NgControl, { optional: true, self: true });
  readonly value = signal<unknown>(null);

  protected isDisabled = signal(false);

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private onChange: (v: unknown) => void = () => {};
  onTouched: () => void = () => {};

  // ngControl.invalid/.touched aren't signals, so a plain computed() over them
  // wouldn't know to recompute when they change — this signal is kept in sync
  // imperatively by the ControlEventsForwarder's onEvent callback below, and
  // hasError composes it with the (genuinely signal-backed) errorMessage input.
  private readonly ngControlHasError = signal(false);
  readonly hasError = computed(() => !!this.errorMessage() || this.ngControlHasError());

  private readonly controlEvents = new ControlEventsForwarder(this.ngControl, this.cdr, this.destroyRef, () =>
    this.ngControlHasError.set(!!this.ngControl?.invalid && !!this.ngControl?.touched),
  );

  constructor() {
    bindSelfAsValueAccessor(this.ngControl, this);
  }

  select(val: unknown): void {
    this.value.set(val);
    this.onChange(val);
  }

  writeValue(value: unknown): void {
    this.value.set(value ?? null);
    this.controlEvents.sync();
  }
  registerOnChange(fn: (v: unknown) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.isDisabled.set(isDisabled); }
}
