import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsliRangeComponent } from './usli-range.component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, UsliRangeComponent],
  template: `<usli-range [formControl]="ctrl" [min]="min()" [max]="max()" [showValue]="showValue()" [errorMessage]="errorMessage()" />`,
})
class TestHost {
  ctrl = new FormControl(0);
  min = signal(0);
  max = signal(100);
  showValue = signal(false);
  errorMessage = signal<string | undefined>(undefined);
}

describe('UsliRangeComponent', () => {
  let fixture: ComponentFixture<TestHost>;
  let host: TestHost;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHost] }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders a range input', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.type).toBe('range');
  });

  it('applies min/max', () => {
    host.min.set(10);
    host.max.set(50);
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.min).toBe('10');
    expect(input.max).toBe('50');
  });

  it('does not show the value by default', () => {
    expect(fixture.nativeElement.querySelector('.usli-range__value')).toBeNull();
  });

  it('shows the live value when showValue is true', () => {
    host.showValue.set(true);
    fixture.detectChanges();
    host.ctrl.setValue(42);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.usli-range__value').textContent?.trim()).toBe('42');
  });

  it('updates formControl value as a number when the slider moves', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = '75';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(host.ctrl.value).toBe(75);
  });

  it('disables the input when formControl is disabled', () => {
    host.ctrl.disable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('input').disabled).toBe(true);
  });

  it('adds is-invalid when ngControl is invalid and touched', () => {
    host.ctrl.setValidators(Validators.min(10));
    host.ctrl.updateValueAndValidity();
    fixture.detectChanges();
    host.ctrl.markAsTouched();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('input').classList.contains('is-invalid')).toBe(true);
  });

  it('shows the errorMessage text', () => {
    host.errorMessage.set('Out of range');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.invalid-feedback')?.textContent?.trim()).toBe('Out of range');
  });
});
