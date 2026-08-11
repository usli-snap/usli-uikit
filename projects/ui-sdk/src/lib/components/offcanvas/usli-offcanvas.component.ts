import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, input, model, output, viewChild } from '@angular/core';
import { IdGeneratorService } from '../../shared/id-generator.service';
import { createDialogController } from '../../shared/dialog-controller';

@Component({
  selector: 'usli-offcanvas',
  standalone: true,
  templateUrl: './usli-offcanvas.component.html',
  styleUrl: './usli-offcanvas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // See usli-modal.component.ts for why: without this, a static id="..."
    // attribute duplicates onto this host element too, and commandFor
    // resolves to the wrong (non-dialog) element, silently no-oping.
    '[attr.id]': 'null',
  },
})
export class UsliOffcanvasComponent {
  /**
   * Id of the underlying <dialog> element. Set this explicitly to wire up a
   * zero-JS trigger via usli-button's [commandFor] (e.g. command="show-modal").
   * Auto-generated when omitted, for panels opened purely via [(open)].
   */
  id = input<string | undefined>();

  /** Two-way bindable open state via [(open)] */
  open = model(false);

  /** Which edge the panel slides in from */
  placement = input<'start' | 'end' | 'top' | 'bottom'>('start');

  /** Optional heading rendered in the panel header */
  title = input<string | undefined>();

  /** Disables closing via backdrop click or Escape */
  staticBackdrop = input(false);

  /** Shows the header close button */
  dismissible = input(true);

  /** Emitted whenever the panel closes, regardless of cause */
  closed = output<void>();

  private readonly generatedId = inject(IdGeneratorService).next('usli-offcanvas');
  protected readonly dialogId = computed(() => this.id() ?? this.generatedId);

  private readonly dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('dialogEl');

  protected dialogClasses = computed(() => `usli-offcanvas usli-offcanvas--${this.placement()}`);

  protected readonly dialog = createDialogController(this.dialogRef, this.open, this.closed, this.staticBackdrop);
}
