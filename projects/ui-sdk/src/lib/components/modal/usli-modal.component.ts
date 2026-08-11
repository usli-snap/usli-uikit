import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, input, model, output, viewChild } from '@angular/core';
import { IdGeneratorService } from '../../shared/id-generator.service';
import { createDialogController } from '../../shared/dialog-controller';

@Component({
  selector: 'usli-modal',
  standalone: true,
  templateUrl: './usli-modal.component.html',
  styleUrl: './usli-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsliModalComponent {
  /**
   * Id of the underlying <dialog> element. Set this explicitly to wire up a
   * zero-JS trigger via usli-button's [commandFor] (e.g. command="show-modal").
   * Auto-generated when omitted, for modals opened purely via [(open)].
   */
  id = input<string | undefined>();

  /** Two-way bindable open state via [(open)] */
  open = model(false);

  /** Optional heading rendered in the modal header */
  title = input<string | undefined>();

  /** Dialog width */
  size = input<'sm' | 'lg' | 'xl' | undefined>();

  /** Vertically centers the dialog */
  centered = input(false);

  /** Keeps the header/footer fixed and scrolls the body when content overflows */
  scrollable = input(false);

  /** Disables closing via backdrop click or Escape */
  staticBackdrop = input(false);

  /** Shows the header close button */
  dismissible = input(true);

  /** Emitted whenever the modal closes, regardless of cause */
  closed = output<void>();

  private readonly generatedId = inject(IdGeneratorService).next('usli-modal');
  protected readonly dialogId = computed(() => this.id() ?? this.generatedId);

  private readonly dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('dialogEl');

  protected dialogClasses = computed(() => {
    const sizeClass = this.size() ? ` modal-${this.size()}` : '';
    const centeredClass = this.centered() ? ' modal-dialog-centered' : '';
    const scrollableClass = this.scrollable() ? ' modal-dialog-scrollable' : '';
    return `usli-modal modal-dialog${sizeClass}${centeredClass}${scrollableClass}`;
  });

  protected readonly dialog = createDialogController(this.dialogRef, this.open, this.closed, this.staticBackdrop);
}
