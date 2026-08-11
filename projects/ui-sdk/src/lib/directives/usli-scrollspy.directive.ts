import { Directive, ElementRef, PLATFORM_ID, effect, inject, input, model } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Tracks which of several target elements (by id) is currently scrolled into
 * view within the host element, and exposes it as `activeId`. Does not render
 * or own any nav markup itself — bind the resulting activeId to whatever nav
 * you're already using (usli-list-group-item, usli-tabs, plain markup),
 * matching Bootstrap's own scrollspy id-matching decoupling.
 */
@Directive({
  selector: '[usliScrollspy]',
  standalone: true,
})
export class UsliScrollspyDirective {
  /** Element ids to watch, in document order */
  targets = input.required<string[]>();

  /** IntersectionObserver rootMargin — tune where in the viewport a section counts as "active" */
  rootMargin = input('0px 0px -80% 0px');

  /** Id of the currently active target. Two-way bindable via [(activeId)] */
  activeId = model<string | undefined>(undefined);

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    effect((onCleanup) => {
      if (!this.isBrowser) return;

      const elements = this.targets()
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => !!el);

      if (elements.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const intersecting = entries.filter((entry) => entry.isIntersecting);
          if (intersecting.length === 0) return;

          const topmost = intersecting.reduce((a, b) =>
            a.boundingClientRect.top <= b.boundingClientRect.top ? a : b,
          );
          this.activeId.set(topmost.target.id);
        },
        { root: this.elementRef.nativeElement, rootMargin: this.rootMargin() },
      );

      elements.forEach((el) => observer.observe(el));
      onCleanup(() => observer.disconnect());
    });
  }
}
