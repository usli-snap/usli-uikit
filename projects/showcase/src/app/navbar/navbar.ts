import { Component, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['../../assets/usli-navbar.css', './navbar.scss'],
})
export class Navbar {
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private get pagesBase(): string {
    if (!this.isBrowser) return '/';
    const { pathname, origin } = this.doc.location;
    const parts = pathname.split('/').filter(Boolean);
    const idx = parts.indexOf('showcase');
    return `${origin}/${(idx >= 0 ? parts.slice(0, idx) : []).join('/')}/`;
  }

  get homeUrl() { return this.pagesBase; }
  get showcaseUrl() { return this.pagesBase + 'showcase/'; }
  get storybookUrl() { return this.pagesBase + 'storybook/'; }
  get compodocUrl() { return this.pagesBase + 'compodoc/'; }

  private get activeUrl(): string {
    if (!this.isBrowser) return '';
    const current = this.doc.location.href.split('?')[0].split('#')[0].replace(/\/+$/, '');
    return [this.homeUrl, this.showcaseUrl, this.storybookUrl, this.compodocUrl]
      .filter(u => {
        const n = u.replace(/\/+$/, '');
        return current === n || current.startsWith(n + '/');
      })
      .sort((a, b) => b.length - a.length)[0] ?? '';
  }

  isActive(url: string): boolean {
    return this.activeUrl === url;
  }
}
