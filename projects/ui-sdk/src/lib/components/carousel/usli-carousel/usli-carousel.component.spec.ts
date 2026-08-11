import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { UsliCarouselComponent } from './usli-carousel.component';
import { UsliCarouselItemComponent } from '../usli-carousel-item/usli-carousel-item.component';

@Component({
  standalone: true,
  imports: [UsliCarouselComponent, UsliCarouselItemComponent],
  template: `
    <usli-carousel [(activeIndex)]="index" [interval]="interval" [wrap]="wrap" [pauseOnHover]="pauseOnHover">
      <usli-carousel-item>Slide 1</usli-carousel-item>
      <usli-carousel-item>Slide 2</usli-carousel-item>
      <usli-carousel-item>Slide 3</usli-carousel-item>
    </usli-carousel>
  `,
})
class TestHost {
  index = 0;
  interval: number | undefined = undefined;
  wrap = true;
  pauseOnHover = true;
}

describe('UsliCarouselComponent', () => {
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
  });

  function activeSlideText(): string | undefined {
    return (fixture.nativeElement.querySelector('.carousel-item.active') as HTMLElement)?.textContent?.trim();
  }

  it('shows the first slide as active by default', () => {
    expect(activeSlideText()).toBe('Slide 1');
  });

  it('advances to the next slide when the next control is clicked', () => {
    (fixture.nativeElement.querySelector('.carousel-control-next') as HTMLElement).click();
    fixture.detectChanges();
    expect(activeSlideText()).toBe('Slide 2');
  });

  it('goes to the previous slide when the prev control is clicked', () => {
    fixture.componentInstance.index = 1;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    (fixture.nativeElement.querySelector('.carousel-control-prev') as HTMLElement).click();
    fixture.detectChanges();
    expect(activeSlideText()).toBe('Slide 1');
  });

  it('wraps from the last slide to the first when wrap is true', () => {
    fixture.componentInstance.index = 2;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    (fixture.nativeElement.querySelector('.carousel-control-next') as HTMLElement).click();
    fixture.detectChanges();
    expect(activeSlideText()).toBe('Slide 1');
  });

  it('does not wrap past the last slide when wrap is false', () => {
    fixture.componentInstance.wrap = false;
    fixture.componentInstance.index = 2;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    (fixture.nativeElement.querySelector('.carousel-control-next') as HTMLElement).click();
    fixture.detectChanges();
    expect(activeSlideText()).toBe('Slide 3');
  });

  it('navigates via an indicator button', () => {
    const indicators = fixture.nativeElement.querySelectorAll('.carousel-indicators button');
    (indicators[2] as HTMLElement).click();
    fixture.detectChanges();
    expect(activeSlideText()).toBe('Slide 3');
  });

  it('autoplays at the given interval and pauses on hover', () => {
    vi.useFakeTimers();
    try {
      fixture.componentInstance.interval = 1000;
      fixture.changeDetectorRef.markForCheck();
      fixture.detectChanges();

      vi.advanceTimersByTime(1000);
      fixture.detectChanges();
      expect(activeSlideText()).toBe('Slide 2');

      const carousel: HTMLElement = fixture.nativeElement.querySelector('.usli-carousel');
      carousel.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();

      vi.advanceTimersByTime(5000);
      fixture.detectChanges();
      expect(activeSlideText()).toBe('Slide 2');
    } finally {
      vi.useRealTimers();
    }
  });
});
