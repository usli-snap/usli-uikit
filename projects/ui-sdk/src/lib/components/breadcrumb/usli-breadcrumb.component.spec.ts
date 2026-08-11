import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsliBreadcrumbComponent } from './usli-breadcrumb.component';

describe('UsliBreadcrumbComponent', () => {
  let fixture: ComponentFixture<UsliBreadcrumbComponent>;
  let component: UsliBreadcrumbComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsliBreadcrumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsliBreadcrumbComponent);
    component = fixture.componentInstance;
  });

  it('renders one item per entry', () => {
    fixture.componentRef.setInput('items', [{ label: 'Home', href: '/' }, { label: 'Components' }]);
    fixture.detectChanges();
    const items: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('.breadcrumb-item');
    expect(items.length).toBe(2);
  });

  it('renders the last item as current page text, never as a link, even with an href', () => {
    fixture.componentRef.setInput('items', [
      { label: 'Home', href: '/' },
      { label: 'Accordion', href: '/components/accordion' },
    ]);
    fixture.detectChanges();
    const items: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('.breadcrumb-item');
    const last = items[items.length - 1];
    expect(last.classList.contains('active')).toBe(true);
    expect(last.getAttribute('aria-current')).toBe('page');
    expect(last.querySelector('a')).toBeNull();
    expect(last.textContent?.trim()).toBe('Accordion');
  });

  it('renders non-current items with an href as links', () => {
    fixture.componentRef.setInput('items', [{ label: 'Home', href: '/' }, { label: 'Current' }]);
    fixture.detectChanges();
    const link: HTMLAnchorElement | null = fixture.nativeElement.querySelector('.breadcrumb-item a');
    expect(link?.getAttribute('href')).toBe('/');
  });

  it('emits itemClick when a linked crumb is clicked', () => {
    const item = { label: 'Home', href: '/' };
    fixture.componentRef.setInput('items', [item, { label: 'Current' }]);
    fixture.detectChanges();

    let emitted: unknown;
    component.itemClick.subscribe((v) => (emitted = v));
    const link: HTMLAnchorElement = fixture.nativeElement.querySelector('.breadcrumb-item a');
    link.click();

    expect(emitted).toEqual(item);
  });
});
