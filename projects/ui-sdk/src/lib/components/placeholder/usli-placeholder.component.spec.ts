import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsliPlaceholderComponent } from './usli-placeholder.component';

describe('UsliPlaceholderComponent', () => {
  let fixture: ComponentFixture<UsliPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsliPlaceholderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsliPlaceholderComponent);
  });

  it('renders the base placeholder classes', () => {
    fixture.detectChanges();
    const span: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(span.classList.contains('placeholder')).toBe(true);
    expect(span.classList.contains('usli-placeholder')).toBe(true);
  });

  it('applies size, animation, and block classes', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.componentRef.setInput('animation', 'glow');
    fixture.componentRef.setInput('block', true);
    fixture.detectChanges();
    const span: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(span.classList.contains('placeholder-lg')).toBe(true);
    expect(span.classList.contains('placeholder-glow')).toBe(true);
    expect(span.classList.contains('d-block')).toBe(true);
  });

  it('renders a numeric width as pixels', () => {
    fixture.componentRef.setInput('width', 120);
    fixture.detectChanges();
    const span: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(span.style.width).toBe('120px');
  });

  it('renders a string width as-is', () => {
    fixture.componentRef.setInput('width', '6rem');
    fixture.detectChanges();
    const span: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(span.style.width).toBe('6rem');
  });
});
