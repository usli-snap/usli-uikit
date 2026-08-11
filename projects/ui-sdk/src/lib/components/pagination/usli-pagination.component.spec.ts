import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsliPaginationComponent } from './usli-pagination.component';

describe('UsliPaginationComponent', () => {
  let fixture: ComponentFixture<UsliPaginationComponent>;
  let component: UsliPaginationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsliPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsliPaginationComponent);
    component = fixture.componentInstance;
  });

  it('renders every page when totalPages is small', () => {
    fixture.componentRef.setInput('totalPages', 5);
    fixture.detectChanges();
    const pageLinks = Array.from(
      fixture.nativeElement.querySelectorAll('.page-item:not(.disabled) .page-link'),
    ) as HTMLElement[];
    const labels = pageLinks.map((el) => el.textContent?.trim()).filter((t) => t !== '«' && t !== '»');
    expect(labels).toEqual(['1', '2', '3', '4', '5']);
  });

  it('collapses distant pages behind an ellipsis for large totals', () => {
    fixture.componentRef.setInput('totalPages', 20);
    fixture.componentRef.setInput('page', 10);
    fixture.detectChanges();
    const ellipses = fixture.nativeElement.querySelectorAll('.page-item.disabled .page-link');
    const hasEllipsis = Array.from(ellipses as NodeListOf<HTMLElement>).some((el) =>
      el.textContent?.includes('…'),
    );
    expect(hasEllipsis).toBe(true);
    // first and last page are always present
    const allText = (fixture.nativeElement.querySelector('.pagination') as HTMLElement).textContent ?? '';
    expect(allText).toContain('1');
    expect(allText).toContain('20');
  });

  it('disables the previous button on page 1 and next on the last page', () => {
    fixture.componentRef.setInput('totalPages', 5);
    fixture.componentRef.setInput('page', 1);
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('.page-item');
    expect((items[0] as HTMLElement).classList.contains('disabled')).toBe(true);

    fixture.componentRef.setInput('page', 5);
    fixture.detectChanges();
    const lastItem = fixture.nativeElement.querySelectorAll('.page-item');
    expect((lastItem[lastItem.length - 1] as HTMLElement).classList.contains('disabled')).toBe(true);
  });

  it('updates the page model when a page button is clicked', () => {
    fixture.componentRef.setInput('totalPages', 5);
    fixture.detectChanges();

    const buttons = Array.from(fixture.nativeElement.querySelectorAll('.page-link')) as HTMLButtonElement[];
    const pageTwo = buttons.find((b) => b.textContent?.trim() === '2')!;
    pageTwo.click();
    fixture.detectChanges();

    expect(component.page()).toBe(2);
  });

  it('does not navigate when disabled', () => {
    fixture.componentRef.setInput('totalPages', 5);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const buttons = Array.from(fixture.nativeElement.querySelectorAll('.page-link')) as HTMLButtonElement[];
    const pageTwo = buttons.find((b) => b.textContent?.trim() === '2')!;
    pageTwo.click();
    fixture.detectChanges();

    expect(component.page()).toBe(1);
  });
});
