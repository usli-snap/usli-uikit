import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'usli-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<nav class="usli-navbar">
  <div class="usli-navbar__container">
    <a href="./" class="usli-navbar__brand">UI SDK</a>
    <ul class="usli-navbar__links">
      <li><a href="./" [class.active]="isActive('home')">Home</a></li>
      <li><a href="./showcase/" [class.active]="isActive('showcase')">Showcase</a></li>
      <li><a href="./storybook/" [class.active]="isActive('storybook')">Storybook</a></li>
      <li><a href="./compodoc/" [class.active]="isActive('compodoc')">Compodoc</a></li>
    </ul>
  </div>
</nav>`,
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent {
  isActive(path: string): boolean {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    return currentPath.includes(path) && path !== 'home';
  }
}
