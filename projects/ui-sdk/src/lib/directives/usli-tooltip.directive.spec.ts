import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsliTooltipDirective } from './usli-tooltip.directive';

@Component({
  standalone: true,
  imports: [UsliTooltipDirective],
  template: `<button [usliTooltip]="text" [tooltipPlacement]="placement">Hover me</button>`,
})
class TestHost {
  text = 'Helpful text';
  placement: 'top' | 'bottom' | 'start' | 'end' = 'top';
}

describe('UsliTooltipDirective', () => {
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
  });

  it('sets the data-tooltip attribute from the input', () => {
    fixture.detectChanges();
    const button: HTMLElement = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('data-tooltip')).toBe('Helpful text');
    expect(button.classList.contains('usli-tooltip')).toBe(true);
  });

  it('defaults to top placement with no placement modifier class', () => {
    fixture.detectChanges();
    const button: HTMLElement = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('usli-tooltip--bottom')).toBe(false);
    expect(button.classList.contains('usli-tooltip--start')).toBe(false);
    expect(button.classList.contains('usli-tooltip--end')).toBe(false);
  });

  it('applies a placement modifier class', () => {
    fixture.componentInstance.placement = 'bottom';
    fixture.detectChanges();
    const button: HTMLElement = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('usli-tooltip--bottom')).toBe(true);
  });
});
