import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsliDropdownComponent } from './usli-dropdown.component';

@Component({
  standalone: true,
  imports: [UsliDropdownComponent],
  template: `
    <usli-dropdown [label]="label" [disabled]="disabled">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
    </usli-dropdown>
    <button id="outside">Outside</button>
  `,
})
class TestHost {
  label = 'Dropdown';
  disabled = false;
}

describe('UsliDropdownComponent', () => {
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.nativeElement.remove();
  });

  function details(): HTMLDetailsElement {
    return fixture.nativeElement.querySelector('details');
  }

  it('renders the trigger label', () => {
    const summary: HTMLElement = fixture.nativeElement.querySelector('summary');
    expect(summary.textContent?.trim()).toBe('Dropdown');
  });

  it('starts closed', () => {
    expect(details().open).toBe(false);
  });

  it('closes when a click lands outside the dropdown', () => {
    details().open = true;
    fixture.detectChanges();

    (document.getElementById('outside') as HTMLElement).click();
    fixture.detectChanges();

    expect(details().open).toBe(false);
  });

  it('stays open when a click lands inside the menu (not on an item)', () => {
    details().open = true;
    fixture.detectChanges();

    (fixture.nativeElement.querySelector('.dropdown-menu') as HTMLElement).click();
    fixture.detectChanges();

    expect(details().open).toBe(true);
  });

  it('closes when a dropdown-item is clicked', () => {
    details().open = true;
    fixture.detectChanges();

    (fixture.nativeElement.querySelector('.dropdown-item') as HTMLElement).click();
    fixture.detectChanges();

    expect(details().open).toBe(false);
  });

  it('closes on Escape', () => {
    details().open = true;
    fixture.detectChanges();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(details().open).toBe(false);
  });

  it('prevents opening when disabled', () => {
    fixture.componentInstance.disabled = true;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    const summary: HTMLElement = fixture.nativeElement.querySelector('summary');
    summary.click();
    fixture.detectChanges();

    expect(details().open).toBe(false);
  });
});
