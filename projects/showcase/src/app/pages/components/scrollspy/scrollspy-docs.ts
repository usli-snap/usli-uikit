import { Component, signal } from '@angular/core';
import { UsliListGroupComponent, UsliListGroupItemComponent, UsliScrollspyDirective } from 'ui-sdk';

@Component({
  selector: 'app-scrollspy-docs',
  standalone: true,
  imports: [UsliListGroupComponent, UsliListGroupItemComponent, UsliScrollspyDirective],
  templateUrl: './scrollspy-docs.html',
  styleUrl: './scrollspy-docs.scss',
})
export class ScrollspyDocs {
  protected targets = ['spy-intro', 'spy-usage', 'spy-api'];
  protected activeId = signal<string | undefined>(undefined);
}
