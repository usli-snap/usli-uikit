import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsliListGroupItemComponent } from './usli-list-group-item.component';

describe('UsliListGroupItemComponent', () => {
  let fixture: ComponentFixture<UsliListGroupItemComponent>;
  let component: UsliListGroupItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsliListGroupItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsliListGroupItemComponent);
    component = fixture.componentInstance;
  });

  it('renders a plain <li> with no href', () => {
    fixture.detectChanges();
    const li: HTMLElement = fixture.nativeElement.querySelector('li');
    expect(li.classList.contains('list-group-item')).toBe(true);
    expect(fixture.nativeElement.querySelector('a')).toBeNull();
  });

  it('renders an <a> inside the <li> when href is set', () => {
    fixture.componentRef.setInput('href', '/foo');
    fixture.detectChanges();
    const a: HTMLAnchorElement = fixture.nativeElement.querySelector('li > a');
    expect(a.classList.contains('list-group-item')).toBe(true);
    expect(a.getAttribute('href')).toBe('/foo');
  });

  it('applies active/disabled classes', () => {
    fixture.componentRef.setInput('active', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const li: HTMLElement = fixture.nativeElement.querySelector('li');
    expect(li.classList.contains('active')).toBe(true);
    expect(li.classList.contains('disabled')).toBe(true);
  });

  it('strips the href and emits nothing when disabled', () => {
    fixture.componentRef.setInput('href', '/foo');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    let emitted = false;
    component.itemClick.subscribe(() => (emitted = true));
    const a: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(a.getAttribute('href')).toBeNull();
    a.click();
    expect(emitted).toBe(false);
  });

  it('emits itemClick when an enabled linked item is clicked', () => {
    fixture.componentRef.setInput('href', '/foo');
    fixture.detectChanges();

    let emitted = false;
    component.itemClick.subscribe(() => (emitted = true));
    const a: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    a.click();
    expect(emitted).toBe(true);
  });
});
