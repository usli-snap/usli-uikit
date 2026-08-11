import { Component } from '@angular/core';
import { UsliButtonComponent, UsliTooltipDirective } from 'ui-sdk';

@Component({
  selector: 'app-tooltip-docs',
  standalone: true,
  imports: [UsliButtonComponent, UsliTooltipDirective],
  templateUrl: './tooltip-docs.html',
  styleUrl: './tooltip-docs.scss',
})
export class TooltipDocs {}
