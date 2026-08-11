import { InjectionToken, Signal } from '@angular/core';

export interface UsliCarouselControl {
  readonly activeIndex: Signal<number>;
  indexOf(item: unknown): number;
}

export const USLI_CAROUSEL = new InjectionToken<UsliCarouselControl>('USLI_CAROUSEL');
