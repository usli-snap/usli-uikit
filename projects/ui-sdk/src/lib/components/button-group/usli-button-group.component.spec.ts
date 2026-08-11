import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsliButtonGroupComponent } from './usli-button-group.component';

describe('UsliButtonGroupComponent', () => {
  let fixture: ComponentFixture<UsliButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsliButtonGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsliButtonGroupComponent);
  });

  it('renders a horizontal btn-group by default with role=group', () => {
    fixture.detectChanges();
    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(div.classList.contains('btn-group')).toBe(true);
    expect(div.getAttribute('role')).toBe('group');
  });

  it('renders btn-group-vertical when vertical is true', () => {
    fixture.componentRef.setInput('vertical', true);
    fixture.detectChanges();
    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(div.classList.contains('btn-group-vertical')).toBe(true);
    expect(div.classList.contains('btn-group')).toBe(false);
  });

  it('applies a size class', () => {
    fixture.componentRef.setInput('size', 'small');
    fixture.detectChanges();
    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(div.classList.contains('btn-group-sm')).toBe(true);
  });

  it('sets the accessible label', () => {
    fixture.componentRef.setInput('ariaLabel', 'Text alignment');
    fixture.detectChanges();
    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(div.getAttribute('aria-label')).toBe('Text alignment');
  });
});
