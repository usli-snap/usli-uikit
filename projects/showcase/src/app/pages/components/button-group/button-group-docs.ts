import { Component } from '@angular/core';
import { UsliButtonComponent, UsliButtonGroupComponent } from 'ui-sdk';

@Component({
  selector: 'app-button-group-docs',
  standalone: true,
  imports: [UsliButtonComponent, UsliButtonGroupComponent],
  templateUrl: './button-group-docs.html',
  styleUrl: './button-group-docs.scss',
})
export class ButtonGroupDocs {}
