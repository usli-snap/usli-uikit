import { Component } from '@angular/core';
import { UsliButtonComponent, UsliPopoverComponent } from 'ui-sdk';

@Component({
  selector: 'app-popover-docs',
  standalone: true,
  imports: [UsliButtonComponent, UsliPopoverComponent],
  templateUrl: './popover-docs.html',
  styleUrl: './popover-docs.scss',
})
export class PopoverDocs {}
