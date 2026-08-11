import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, input, viewChild } from '@angular/core';
import type { ButtonVariant } from '../button';

@Component({
  selector: 'usli-dropdown',
  standalone: true,
  templateUrl: './usli-dropdown.component.html',
  styleUrl: './usli-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class UsliDropdownComponent {
  /** Trigger button text — used when no content is projected into the toggle */
  label = input('Dropdown');

  /** Trigger button color variant */
  variant = input<ButtonVariant>('secondary');

  /** Menu alignment relative to the trigger */
  align = input<'start' | 'end'>('start');

  /** Disables the trigger */
  disabled = input(false);

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly detailsRef = viewChild.required<ElementRef<HTMLDetailsElement>>('details');

  protected buttonClasses = computed(() => `btn btn-usli-${this.variant()} dropdown-toggle`);

  protected menuClasses = computed(() => {
    const alignClass = this.align() === 'end' ? ' dropdown-menu-end' : '';
    return `dropdown-menu${alignClass}`;
  });

  protected onSummaryClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
    }
  }

  protected onMenuClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).closest('.dropdown-item')) {
      this.closeMenu();
    }
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.closeMenu();
    }
  }

  protected closeMenu(): void {
    this.detailsRef().nativeElement.open = false;
  }
}
