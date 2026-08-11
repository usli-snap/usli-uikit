import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { UsliScrollspyDirective } from './usli-scrollspy.directive';

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  observed: Element[] = [];
  disconnected = false;

  constructor(
    public callback: IntersectionObserverCallback,
    public options?: IntersectionObserverInit,
  ) {
    MockIntersectionObserver.instances.push(this);
  }

  observe(el: Element): void {
    this.observed.push(el);
  }

  unobserve(): void {}

  disconnect(): void {
    this.disconnected = true;
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  trigger(entries: Array<{ target: Element; isIntersecting: boolean; top: number }>): void {
    this.callback(
      entries.map(
        (e) =>
          ({
            target: e.target,
            isIntersecting: e.isIntersecting,
            boundingClientRect: { top: e.top } as DOMRectReadOnly,
          }) as IntersectionObserverEntry,
      ),
      this as unknown as IntersectionObserver,
    );
  }
}

@Component({
  standalone: true,
  imports: [UsliScrollspyDirective],
  template: `
    <div usliScrollspy [targets]="targets" [(activeId)]="activeId">
      <div id="scrollspy-sec-a">A</div>
      <div id="scrollspy-sec-b">B</div>
    </div>
  `,
})
class TestHost {
  targets = ['scrollspy-sec-a', 'scrollspy-sec-b'];
  activeId: string | undefined;
}

describe('UsliScrollspyDirective', () => {
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.nativeElement.remove();
    vi.unstubAllGlobals();
  });

  function latestObserver(): MockIntersectionObserver {
    return MockIntersectionObserver.instances[MockIntersectionObserver.instances.length - 1];
  }

  it('observes every resolvable target element', () => {
    const observer = latestObserver();
    expect(observer.observed.map((el) => el.id)).toEqual(['scrollspy-sec-a', 'scrollspy-sec-b']);
  });

  it('sets activeId to the intersecting target', () => {
    const observer = latestObserver();
    const elA = document.getElementById('scrollspy-sec-a')!;

    observer.trigger([{ target: elA, isIntersecting: true, top: 10 }]);
    fixture.detectChanges();

    expect(fixture.componentInstance.activeId).toBe('scrollspy-sec-a');
  });

  it('picks the topmost entry when multiple are intersecting', () => {
    const observer = latestObserver();
    const elA = document.getElementById('scrollspy-sec-a')!;
    const elB = document.getElementById('scrollspy-sec-b')!;

    observer.trigger([
      { target: elB, isIntersecting: true, top: 50 },
      { target: elA, isIntersecting: true, top: 5 },
    ]);
    fixture.detectChanges();

    expect(fixture.componentInstance.activeId).toBe('scrollspy-sec-a');
  });

  it('ignores entries that are not intersecting', () => {
    const observer = latestObserver();
    const elA = document.getElementById('scrollspy-sec-a')!;

    observer.trigger([{ target: elA, isIntersecting: false, top: 10 }]);
    fixture.detectChanges();

    expect(fixture.componentInstance.activeId).toBeUndefined();
  });

  it('disconnects the observer on destroy', () => {
    const observer = latestObserver();
    fixture.destroy();
    expect(observer.disconnected).toBe(true);
  });
});
