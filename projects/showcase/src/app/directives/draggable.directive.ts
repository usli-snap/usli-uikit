import { Directive, ElementRef, HostListener, input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appDraggable]',
  standalone: true,
})
export class DraggableDirective implements OnDestroy {
  /** CSS selector for the drag handle within the host. Defaults to [data-drag-handle]. */
  handleSelector = input('[data-drag-handle]');

  private x = 0;
  private y = 0;
  private startX = 0;
  private startY = 0;

  private readonly onMove = (e: MouseEvent) => {
    this.x = e.clientX - this.startX;
    this.y = e.clientY - this.startY;
    this.el.nativeElement.style.transform = `translate(${this.x}px, ${this.y}px)`;
  };

  private readonly onUp = () => {
    document.removeEventListener('mousemove', this.onMove);
    document.removeEventListener('mouseup', this.onUp);
  };

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mousedown', ['$event'])
  onDown(e: MouseEvent): void {
    const handle = this.el.nativeElement.querySelector(this.handleSelector());
    if (!handle?.contains(e.target as Node)) return;

    this.startX = e.clientX - this.x;
    this.startY = e.clientY - this.y;

    document.addEventListener('mousemove', this.onMove);
    document.addEventListener('mouseup', this.onUp);
    e.preventDefault();
  }

  // Reset when a popover closes so it re-centers on next open
  @HostListener('toggle', ['$event'])
  onToggle(e: Event): void {
    if ((e as ToggleEvent).newState === 'closed') this.reset();
  }

  // Reset when a <dialog> closes so it re-centers on next open
  @HostListener('close')
  onClose(): void {
    this.reset();
  }

  private reset(): void {
    this.x = 0;
    this.y = 0;
    this.el.nativeElement.style.transform = '';
  }

  ngOnDestroy(): void {
    document.removeEventListener('mousemove', this.onMove);
    document.removeEventListener('mouseup', this.onUp);
  }
}
