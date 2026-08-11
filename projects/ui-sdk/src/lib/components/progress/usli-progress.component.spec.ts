import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsliProgressComponent } from './usli-progress.component';

describe('UsliProgressComponent', () => {
  let fixture: ComponentFixture<UsliProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsliProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsliProgressComponent);
    fixture.componentRef.setInput('value', 40);
  });

  it('computes bar width as a percentage of max', () => {
    fixture.detectChanges();
    const bar: HTMLElement = fixture.nativeElement.querySelector('.progress-bar');
    expect(bar.style.width).toBe('40%');
    expect(bar.getAttribute('aria-valuenow')).toBe('40');
  });

  it('respects a custom max', () => {
    fixture.componentRef.setInput('max', 200);
    fixture.detectChanges();
    const bar: HTMLElement = fixture.nativeElement.querySelector('.progress-bar');
    expect(bar.style.width).toBe('20%');
  });

  it('clamps values above max to 100%', () => {
    fixture.componentRef.setInput('value', 999);
    fixture.detectChanges();
    const bar: HTMLElement = fixture.nativeElement.querySelector('.progress-bar');
    expect(bar.style.width).toBe('100%');
  });

  it('applies striped/animated classes', () => {
    fixture.componentRef.setInput('animated', true);
    fixture.detectChanges();
    const bar: HTMLElement = fixture.nativeElement.querySelector('.progress-bar');
    expect(bar.classList.contains('progress-bar-striped')).toBe(true);
    expect(bar.classList.contains('progress-bar-animated')).toBe(true);
  });

  it('shows the percentage label when showLabel is true and no label is set', () => {
    fixture.componentRef.setInput('showLabel', true);
    fixture.detectChanges();
    const bar: HTMLElement = fixture.nativeElement.querySelector('.progress-bar');
    expect(bar.textContent?.trim()).toBe('40%');
  });

  it('prefers an explicit label over the computed percentage', () => {
    fixture.componentRef.setInput('showLabel', true);
    fixture.componentRef.setInput('label', 'Uploading…');
    fixture.detectChanges();
    const bar: HTMLElement = fixture.nativeElement.querySelector('.progress-bar');
    expect(bar.textContent?.trim()).toBe('Uploading…');
  });
});
