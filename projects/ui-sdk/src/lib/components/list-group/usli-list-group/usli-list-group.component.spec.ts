import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsliListGroupComponent } from './usli-list-group.component';

describe('UsliListGroupComponent', () => {
  let fixture: ComponentFixture<UsliListGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsliListGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsliListGroupComponent);
  });

  it('renders a <ul> by default', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ul.list-group')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('ol')).toBeNull();
  });

  it('renders an <ol> when numbered', () => {
    fixture.componentRef.setInput('numbered', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ol.list-group-numbered')).toBeTruthy();
  });

  it('applies flush and horizontal classes', () => {
    fixture.componentRef.setInput('flush', true);
    fixture.componentRef.setInput('horizontal', true);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('ul');
    expect(el.classList.contains('list-group-flush')).toBe(true);
    expect(el.classList.contains('list-group-horizontal')).toBe(true);
  });
});
