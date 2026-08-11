import { Component } from '@angular/core';
import { UsliDropdownComponent } from 'ui-sdk';

@Component({
  selector: 'app-dropdown-docs',
  standalone: true,
  imports: [UsliDropdownComponent],
  templateUrl: './dropdown-docs.html',
  styleUrl: './dropdown-docs.scss',
})
export class DropdownDocs {}
