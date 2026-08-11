import { ElementRef, Signal, WritableSignal, effect } from '@angular/core';

export interface DialogController {
  onClose(): void;
  onCancel(event: Event): void;
  onBackdropClick(event: MouseEvent): void;
}

/**
 * Wires a WritableSignal open state to a native <dialog>'s showModal()/close(),
 * plus backdrop-click and staticBackdrop handling. Shared by usli-modal and
 * usli-offcanvas, whose open/close mechanics are otherwise identical — only
 * the surrounding markup/CSS differs.
 *
 * Must be called from an injection context (e.g. a component constructor).
 */
export function createDialogController(
  dialogRef: () => ElementRef<HTMLDialogElement>,
  open: WritableSignal<boolean>,
  closed: { emit(): void },
  staticBackdrop: Signal<boolean>,
): DialogController {
  effect(() => {
    const isOpen = open();
    const dialog = dialogRef().nativeElement;
    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  });

  return {
    onClose(): void {
      open.set(false);
      closed.emit();
    },
    onCancel(event: Event): void {
      if (staticBackdrop()) {
        event.preventDefault();
      }
    },
    onBackdropClick(event: MouseEvent): void {
      if (staticBackdrop()) return;
      if (event.target === dialogRef().nativeElement) {
        dialogRef().nativeElement.close();
      }
    },
  };
}
