import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsliOffcanvasComponent } from './usli-offcanvas.component';

@Component({
  standalone: true,
  imports: [UsliOffcanvasComponent],
  template: `
    <usli-offcanvas [(open)]="open" [placement]="placement" [title]="title" (closed)="onClosed()">
      Panel body content
    </usli-offcanvas>
  `,
})
class TestHost {
  open = false;
  placement: 'start' | 'end' | 'top' | 'bottom' = 'start';
  title: string | undefined = 'Filters';
  closedCount = 0;
  onClosed(): void {
    this.closedCount++;
  }
}

describe('UsliOffcanvasComponent', () => {
  let fixture: ComponentFixture<TestHost>;

  // jsdom doesn't implement HTMLDialogElement.showModal()/close() — polyfill
  // just enough (open reflection + a close event) so the effect() under test
  // can run. Real browsers implement these natively.
  beforeAll(() => {
    if (typeof HTMLDialogElement.prototype.showModal !== 'function') {
      HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
        this.setAttribute('open', '');
      };
    }
    if (typeof HTMLDialogElement.prototype.close !== 'function') {
      HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
        this.removeAttribute('open');
        this.dispatchEvent(new Event('close'));
      };
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
  });

  function dialog(): HTMLDialogElement {
    return fixture.nativeElement.querySelector('dialog');
  }

  it('starts closed', () => {
    expect(dialog().open).toBe(false);
  });

  it('opens when the open model becomes true and applies the placement class', () => {
    fixture.componentInstance.open = true;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    expect(dialog().open).toBe(true);
    expect(dialog().classList.contains('usli-offcanvas--start')).toBe(true);
  });

  it('applies a different placement class', () => {
    fixture.componentInstance.placement = 'end';
    fixture.componentInstance.open = true;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    expect(dialog().classList.contains('usli-offcanvas--end')).toBe(true);
  });

  it('emits closed and syncs the open model when the dialog closes natively', () => {
    fixture.componentInstance.open = true;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    dialog().close();
    fixture.detectChanges();

    expect(fixture.componentInstance.open).toBe(false);
    expect(fixture.componentInstance.closedCount).toBe(1);
  });

  it('renders the title in the header', () => {
    fixture.componentInstance.open = true;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    const heading: HTMLElement = fixture.nativeElement.querySelector('.offcanvas-title');
    expect(heading.textContent?.trim()).toBe('Filters');
  });
});
