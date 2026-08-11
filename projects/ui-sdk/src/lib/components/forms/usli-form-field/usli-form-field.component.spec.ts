import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsliFormFieldComponent } from './usli-form-field.component';
import { UsliInputComponent } from '../usli-input/usli-input.component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, UsliFormFieldComponent, UsliInputComponent],
  template: `
    <usli-form-field [label]="label" [hint]="hint" [floating]="floating">
      <usli-input [formControl]="ctrl" placeholder=" " />
    </usli-form-field>
  `,
})
class TestHost {
  ctrl = new FormControl('', Validators.required);
  label: string | undefined = undefined;
  hint: string | undefined = undefined;
  floating = false;
}

describe('UsliFormFieldComponent', () => {
  let fixture: ComponentFixture<TestHost>;
  let host: TestHost;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHost] }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders a label when label input is set', () => {
    host.label = 'Email';
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.form-label')?.textContent?.trim()).toBe('Email');
  });

  it('renders no label when label is not set', () => {
    expect(fixture.nativeElement.querySelector('.form-label')).toBeNull();
  });

  it('shows no error when pristine even if invalid', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.invalid-feedback')).toBeNull();
  });

  it('shows required error when invalid and touched', () => {
    host.ctrl.markAsTouched();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.invalid-feedback')?.textContent?.trim()).toBe('This field is required');
  });

  it('shows email error for email validator', () => {
    host.ctrl.setValue('notanemail');
    host.ctrl.setValidators(Validators.email);
    host.ctrl.updateValueAndValidity();
    host.ctrl.markAsTouched();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.invalid-feedback')?.textContent?.trim()).toBe('Enter a valid email address');
  });

  it('shows minlength error for minlength validator', () => {
    host.ctrl.setValue('a');
    host.ctrl.setValidators(Validators.minLength(5));
    host.ctrl.updateValueAndValidity();
    host.ctrl.markAsTouched();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.invalid-feedback')?.textContent?.trim()).toBe('Minimum length not met');
  });

  it('shows fallback message for unknown error keys', () => {
    host.ctrl.setErrors({ customError: true });
    host.ctrl.markAsTouched();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.invalid-feedback')?.textContent?.trim()).toBe('Invalid value');
  });

  it('shows no error when control is valid', () => {
    host.ctrl.setValue('hello');
    host.ctrl.markAsTouched();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.invalid-feedback')).toBeNull();
  });

  it('shows the hint when set', () => {
    host.hint = 'We will never share your email.';
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.form-text')?.textContent?.trim()).toBe(
      'We will never share your email.',
    );
  });

  it('hides the hint while an error is showing', () => {
    host.hint = 'We will never share your email.';
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    host.ctrl.markAsTouched();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.form-text')).toBeNull();
    expect(fixture.nativeElement.querySelector('.invalid-feedback')).toBeTruthy();
  });

  it('renders a form-floating wrapper with the control before the label when floating is true', () => {
    host.label = 'Email';
    host.floating = true;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    const wrapper: HTMLElement = fixture.nativeElement.querySelector('.form-floating');
    expect(wrapper).toBeTruthy();
    const children = Array.from(wrapper.children) as HTMLElement[];
    const inputIndex = children.findIndex((el) => el.tagName === 'USLI-INPUT');
    const labelIndex = children.findIndex((el) => el.classList.contains('form-label'));
    expect(inputIndex).toBeGreaterThanOrEqual(0);
    expect(labelIndex).toBeGreaterThan(inputIndex);
  });

  it('does not render a form-floating wrapper by default', () => {
    expect(fixture.nativeElement.querySelector('.form-floating')).toBeNull();
  });
});
