import { ChangeDetectorRef, DestroyRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

/**
 * Self-binding CVA pattern: assigns the accessor before
 * FormControlDirective.ngOnChanges → setUpControl() runs, so it's found
 * without an NG_VALUE_ACCESSOR provider. Must be called from the accessor's
 * constructor, not ngOnInit — ngOnChanges on sibling directives on the same
 * element runs before any ngOnInit hooks.
 */
export function bindSelfAsValueAccessor(ngControl: NgControl | null, accessor: ControlValueAccessor): void {
  if (ngControl) {
    ngControl.valueAccessor = accessor;
  }
}

/**
 * Forwards a bound control's unified `events` stream into `markForCheck()`,
 * so changes that happen outside Angular's own change detection — e.g.
 * markAsTouched(), which is exactly what invalid-state styling depends on —
 * still refresh an OnPush component. (statusChanges alone misses touched-only
 * changes; events covers all of them.)
 *
 * `ngControl.control` isn't populated until FormControlDirective.ngOnChanges
 * runs (after the constructor), so this can't subscribe eagerly — call
 * `sync()` from `writeValue()` instead, which Angular invokes once the
 * control is actually attached (and again on every rebind to a new control).
 */
export class ControlEventsForwarder {
  private trackedControl: AbstractControl | null = null;
  private subscription: Subscription | null = null;

  constructor(
    private readonly ngControl: NgControl | null,
    private readonly cdr: ChangeDetectorRef,
    destroyRef: DestroyRef,
    /** Invoked alongside markForCheck() on every control event — e.g. to sync a derived signal. */
    private readonly onEvent?: () => void,
  ) {
    destroyRef.onDestroy(() => this.subscription?.unsubscribe());
  }

  sync(): void {
    const ctrl = this.ngControl?.control ?? null;
    if (ctrl === this.trackedControl) return;

    this.subscription?.unsubscribe();
    this.trackedControl = ctrl;
    this.subscription =
      ctrl?.events.subscribe(() => {
        this.cdr.markForCheck();
        this.onEvent?.();
      }) ?? null;
  }
}
