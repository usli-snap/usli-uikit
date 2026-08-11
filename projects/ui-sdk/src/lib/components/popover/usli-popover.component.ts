import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, input } from '@angular/core';
import { IdGeneratorService } from '../../shared/id-generator.service';

const GAP_PX = 8;

@Component({
  selector: 'usli-popover',
  standalone: true,
  templateUrl: './usli-popover.component.html',
  styleUrl: './usli-popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'usli-popover popover',
    popover: '',
    '[id]': 'popoverId()',
    '(command)': 'onCommand($event)',
    '(toggle)': 'onToggle($event)',
  },
})
export class UsliPopoverComponent {
  /**
   * Id of this popover. Set this explicitly to wire up a zero-JS trigger via
   * usli-button's [commandFor] (command="toggle-popover"). Auto-generated
   * when omitted.
   */
  id = input<string | undefined>();

  /** Optional heading rendered above the projected body content */
  title = input<string | undefined>();

  /**
   * Static placement hint relative to the trigger — no collision detection,
   * same caveat as usli-tooltip. For anchoring, the trigger's position is
   * read once on open via getBoundingClientRect(); it isn't re-measured on
   * scroll/resize.
   */
  placement = input<'top' | 'bottom' | 'start' | 'end'>('top');

  private readonly generatedId = inject(IdGeneratorService).next('usli-popover');
  protected readonly popoverId = computed(() => this.id() ?? this.generatedId);

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private triggerEl: HTMLElement | null = null;

  protected onCommand(event: Event): void {
    const source = (event as Event & { source?: HTMLElement }).source;
    if (source) {
      this.triggerEl = source;
    }
  }

  protected onToggle(event: Event): void {
    const toggleEvent = event as ToggleEvent;
    if (toggleEvent.newState === 'open') {
      this.positionRelativeToTrigger();
    }
  }

  private positionRelativeToTrigger(): void {
    const trigger = this.triggerEl;
    if (!trigger) return;

    const triggerRect = trigger.getBoundingClientRect();
    const el = this.elementRef.nativeElement;
    const popoverRect = el.getBoundingClientRect();

    let top: number;
    let left: number;

    switch (this.placement()) {
      case 'bottom':
        top = triggerRect.bottom + GAP_PX;
        left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
        break;
      case 'start':
        top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
        left = triggerRect.left - popoverRect.width - GAP_PX;
        break;
      case 'end':
        top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
        left = triggerRect.right + GAP_PX;
        break;
      case 'top':
      default:
        top = triggerRect.top - popoverRect.height - GAP_PX;
        left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
        break;
    }

    el.style.top = `${Math.max(GAP_PX, top)}px`;
    el.style.left = `${Math.max(GAP_PX, left)}px`;
  }
}
