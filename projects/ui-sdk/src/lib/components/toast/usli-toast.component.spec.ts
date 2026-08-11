import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { UsliToastComponent } from './usli-toast.component';

describe('UsliToastComponent', () => {
  let fixture: ComponentFixture<UsliToastComponent>;
  let component: UsliToastComponent;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  async function create(): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [UsliToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsliToastComponent);
    component = fixture.componentInstance;
  }

  it('renders visible with show class by default', async () => {
    await create();
    fixture.detectChanges();
    const toast: HTMLElement = fixture.nativeElement.querySelector('.toast');
    expect(toast.classList.contains('show')).toBe(true);
  });

  it('auto-dismisses after the delay by default', async () => {
    await create();
    fixture.componentRef.setInput('delay', 3000);
    fixture.detectChanges();

    vi.advanceTimersByTime(2999);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.toast')).toBeTruthy();

    vi.advanceTimersByTime(1);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.toast')).toBeNull();
  });

  it('does not auto-dismiss when autohide is false', async () => {
    await create();
    fixture.componentRef.setInput('autohide', false);
    fixture.componentRef.setInput('delay', 100);
    fixture.detectChanges();

    vi.advanceTimersByTime(10000);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.toast')).toBeTruthy();
  });

  it('emits dismissed and hides when the close button is clicked', async () => {
    await create();
    fixture.componentRef.setInput('autohide', false);
    fixture.detectChanges();

    let emitted = false;
    component.dismissed.subscribe(() => (emitted = true));

    const closeBtn: HTMLButtonElement = fixture.nativeElement.querySelector('.btn-close');
    closeBtn.click();
    fixture.detectChanges();

    expect(emitted).toBe(true);
    expect(fixture.nativeElement.querySelector('.toast')).toBeNull();
  });

  it('renders the title when set', async () => {
    await create();
    fixture.componentRef.setInput('title', 'Saved');
    fixture.componentRef.setInput('autohide', false);
    fixture.detectChanges();

    const heading: HTMLElement = fixture.nativeElement.querySelector('.toast-header strong');
    expect(heading.textContent?.trim()).toBe('Saved');
  });
});
