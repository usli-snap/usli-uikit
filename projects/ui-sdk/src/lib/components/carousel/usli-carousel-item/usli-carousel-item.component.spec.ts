import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { USLI_CAROUSEL, type UsliCarouselControl } from '../carousel.token';
import { UsliCarouselItemComponent } from './usli-carousel-item.component';

@Component({
  standalone: true,
  imports: [UsliCarouselItemComponent],
  template: `<usli-carousel-item>Slide content</usli-carousel-item>`,
})
class TestHost {}

async function setup(activeIndex: number, indexOfReturn: number) {
  const mockGroup: UsliCarouselControl = {
    activeIndex: signal(activeIndex),
    indexOf: vi.fn().mockReturnValue(indexOfReturn),
  };

  await TestBed.configureTestingModule({
    imports: [TestHost],
    providers: [{ provide: USLI_CAROUSEL, useValue: mockGroup }],
  }).compileComponents();

  const fixture: ComponentFixture<TestHost> = TestBed.createComponent(TestHost);
  fixture.detectChanges();
  return { fixture, mockGroup };
}

describe('UsliCarouselItemComponent', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('is active when the group active index matches its own index', async () => {
    const { fixture } = await setup(1, 1);
    const item: HTMLElement = fixture.nativeElement.querySelector('.carousel-item');
    expect(item.classList.contains('active')).toBe(true);
  });

  it('is not active when the group active index does not match', async () => {
    const { fixture } = await setup(0, 1);
    const item: HTMLElement = fixture.nativeElement.querySelector('.carousel-item');
    expect(item.classList.contains('active')).toBe(false);
  });

  it('asks the group for its own index', async () => {
    const { mockGroup } = await setup(0, 0);
    expect(mockGroup.indexOf).toHaveBeenCalled();
  });
});
