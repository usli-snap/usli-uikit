import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { UsliPopoverComponent } from './usli-popover.component';

@Component({
  standalone: true,
  imports: [UsliPopoverComponent],
  template: `
    <button id="trigger-btn">Trigger</button>
    <usli-popover [id]="id" [title]="title" [placement]="placement">Popover body</usli-popover>
  `,
})
class TestHost {
  id = 'test-popover';
  title: string | undefined = 'Heads up';
  placement: 'top' | 'bottom' | 'start' | 'end' = 'top';
}

function rect(partial: Partial<DOMRect>): DOMRect {
  return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => ({}), ...partial };
}

describe('UsliPopoverComponent', () => {
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
  });

  function popoverEl(): HTMLElement {
    return fixture.nativeElement.querySelector('usli-popover');
  }

  it('sets the popover attribute and id on the host', () => {
    expect(popoverEl().getAttribute('popover')).toBe('');
    expect(popoverEl().id).toBe('test-popover');
  });

  it('renders the title header and projected body', () => {
    const header: HTMLElement = fixture.nativeElement.querySelector('.popover-header');
    expect(header.textContent?.trim()).toBe('Heads up');
    const body: HTMLElement = fixture.nativeElement.querySelector('.popover-body');
    expect(body.textContent?.trim()).toContain('Popover body');
  });

  it('omits the header when no title is set', () => {
    fixture.componentInstance.title = undefined;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.popover-header')).toBeNull();
  });

  it('positions itself relative to the trigger captured from a command event', () => {
    const trigger: HTMLElement = fixture.nativeElement.querySelector('#trigger-btn');
    const el = popoverEl();

    vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue(
      rect({ top: 100, bottom: 130, left: 50, right: 150, width: 100, height: 30 }),
    );
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(
      rect({ top: 0, bottom: 40, left: 0, right: 200, width: 200, height: 40 }),
    );

    const commandEvent = new Event('command') as Event & { source?: HTMLElement };
    commandEvent.source = trigger;
    el.dispatchEvent(commandEvent);

    const toggleEvent = new Event('toggle') as Event & { newState?: string };
    toggleEvent.newState = 'open';
    el.dispatchEvent(toggleEvent);

    // top placement: top = triggerTop - popoverHeight - gap(8) = 100 - 40 - 8 = 52
    // left = triggerLeft + triggerWidth/2 - popoverWidth/2 = 50 + 50 - 100 = 0 -> clamped to gap(8)
    expect(el.style.top).toBe('52px');
    expect(el.style.left).toBe('8px');
  });

  it('does not reposition on a toggle event that closes the popover', () => {
    const el = popoverEl();
    el.style.top = '';
    el.style.left = '';

    const toggleEvent = new Event('toggle') as Event & { newState?: string };
    toggleEvent.newState = 'closed';
    el.dispatchEvent(toggleEvent);

    expect(el.style.top).toBe('');
    expect(el.style.left).toBe('');
  });
});
