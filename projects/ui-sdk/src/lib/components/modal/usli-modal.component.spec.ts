import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsliModalComponent } from './usli-modal.component';

@Component({
  standalone: true,
  imports: [UsliModalComponent],
  template: `
    <usli-modal [(open)]="open" [title]="title" [staticBackdrop]="staticBackdrop" (closed)="onClosed()">
      Modal body content
    </usli-modal>
  `,
})
class TestHost {
  open = false;
  title: string | undefined = 'Confirm';
  staticBackdrop = false;
  closedCount = 0;
  onClosed(): void {
    this.closedCount++;
  }
}

describe('UsliModalComponent', () => {
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

  it('opens the native dialog when the open model becomes true', () => {
    fixture.componentInstance.open = true;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    expect(dialog().open).toBe(true);
  });

  it('closes the dialog when the open model becomes false', () => {
    fixture.componentInstance.open = true;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    fixture.componentInstance.open = false;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    expect(dialog().open).toBe(false);
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

  it('closes on a backdrop click (click target is the dialog itself)', () => {
    fixture.componentInstance.open = true;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    dialog().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(dialog().open).toBe(false);
  });

  it('does not close on backdrop click when staticBackdrop is set', () => {
    fixture.componentInstance.staticBackdrop = true;
    fixture.componentInstance.open = true;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    dialog().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(dialog().open).toBe(true);
  });

  it('renders the title in the header', () => {
    fixture.componentInstance.open = true;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    const heading: HTMLElement = fixture.nativeElement.querySelector('.modal-title');
    expect(heading.textContent?.trim()).toBe('Confirm');
  });
});
