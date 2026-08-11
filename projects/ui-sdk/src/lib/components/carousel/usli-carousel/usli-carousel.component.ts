import { ChangeDetectionStrategy, Component, contentChildren, effect, input, model, signal } from '@angular/core';
import { USLI_CAROUSEL, type UsliCarouselControl } from '../carousel.token';
import { UsliCarouselItemComponent } from '../usli-carousel-item/usli-carousel-item.component';

@Component({
  selector: 'usli-carousel',
  standalone: true,
  templateUrl: './usli-carousel.component.html',
  styleUrl: './usli-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: USLI_CAROUSEL, useExisting: UsliCarouselComponent }],
})
export class UsliCarouselComponent implements UsliCarouselControl {
  /** Two-way bindable active slide index */
  activeIndex = model(0);

  /** Autoplay interval in ms. 0 or undefined disables autoplay */
  interval = input<number | undefined>(5000);

  /** Pauses autoplay on hover/focus, as WCAG 2.2.2 requires for auto-advancing content */
  pauseOnHover = input(true);

  /** Wraps from the last slide back to the first (and vice versa) */
  wrap = input(true);

  /** Shows the dot indicators */
  showIndicators = input(true);

  /** Shows the prev/next controls */
  showControls = input(true);

  protected items = contentChildren(UsliCarouselItemComponent);
  protected paused = signal(false);

  indexOf(item: unknown): number {
    return this.items().indexOf(item as UsliCarouselItemComponent);
  }

  protected next(): void {
    const count = this.items().length;
    if (count === 0) return;
    const nextIndex = this.activeIndex() + 1;
    if (nextIndex >= count) {
      if (this.wrap()) this.activeIndex.set(0);
    } else {
      this.activeIndex.set(nextIndex);
    }
  }

  protected prev(): void {
    const count = this.items().length;
    if (count === 0) return;
    const prevIndex = this.activeIndex() - 1;
    if (prevIndex < 0) {
      if (this.wrap()) this.activeIndex.set(count - 1);
    } else {
      this.activeIndex.set(prevIndex);
    }
  }

  protected goTo(index: number): void {
    this.activeIndex.set(index);
  }

  protected onPause(): void {
    if (this.pauseOnHover()) this.paused.set(true);
  }

  protected onResume(): void {
    if (this.pauseOnHover()) this.paused.set(false);
  }

  constructor() {
    effect((onCleanup) => {
      const ms = this.interval();
      const isPaused = this.paused();
      const count = this.items().length;
      if (!ms || ms <= 0 || isPaused || count <= 1) return;

      const timer = setInterval(() => this.next(), ms);
      onCleanup(() => clearInterval(timer));
    });
  }
}
