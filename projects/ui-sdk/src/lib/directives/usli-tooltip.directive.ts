import { Directive, input } from '@angular/core';

/**
 * Pure-CSS tooltip. No host template — attaches ARIA and a `data-tooltip`
 * attribute to the host element, which the .usli-tooltip stylesheet
 * (projects/ui-sdk/src/lib/usli-tooltip.scss) renders via ::after + :hover/:focus-visible.
 *
 * Consumers must `@use` that stylesheet globally (see the Tooltip docs page) —
 * a directive has no styleUrl of its own to ship the CSS automatically.
 *
 * Plain text only, static placement, no collision detection. For rich content
 * or smart positioning, use usli-popover instead.
 */
@Directive({
  selector: '[usliTooltip]',
  standalone: true,
  host: {
    class: 'usli-tooltip',
    '[attr.data-tooltip]': 'usliTooltip()',
    '[class.usli-tooltip--bottom]': "tooltipPlacement() === 'bottom'",
    '[class.usli-tooltip--start]': "tooltipPlacement() === 'start'",
    '[class.usli-tooltip--end]': "tooltipPlacement() === 'end'",
  },
})
export class UsliTooltipDirective {
  /** Tooltip text */
  usliTooltip = input.required<string>();

  /** Which side the tooltip renders on */
  tooltipPlacement = input<'top' | 'bottom' | 'start' | 'end'>('top');
}
