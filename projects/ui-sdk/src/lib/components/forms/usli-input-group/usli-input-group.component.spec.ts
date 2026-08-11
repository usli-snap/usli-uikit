import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsliInputGroupComponent } from './usli-input-group.component';

@Component({
  standalone: true,
  imports: [UsliInputGroupComponent],
  template: `
    <usli-input-group [size]="size">
      <span usliPrepend class="input-group-text">$</span>
      <input class="form-control" />
      <button usliAppend class="btn btn-usli-secondary">Go</button>
    </usli-input-group>
  `,
})
class TestHost {
  size: 'sm' | 'lg' | undefined;
}

describe('UsliInputGroupComponent', () => {
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
  });

  it('renders the input-group wrapper', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.input-group')).toBeTruthy();
  });

  it('projects prepend, control, and append content in order', () => {
    fixture.detectChanges();
    const wrapper: HTMLElement = fixture.nativeElement.querySelector('.input-group');
    const children = Array.from(wrapper.children) as HTMLElement[];
    expect(children[0].textContent?.trim()).toBe('$');
    expect(children[1].tagName).toBe('INPUT');
    expect(children[2].textContent?.trim()).toBe('Go');
  });

  it('applies a size class', () => {
    fixture.componentInstance.size = 'lg';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.input-group-lg')).toBeTruthy();
  });
});
