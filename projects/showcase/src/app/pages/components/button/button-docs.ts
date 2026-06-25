import { Component } from '@angular/core';
import { UsliButtonComponent } from 'ui-sdk';
import { DraggableDirective } from '../../../directives/draggable.directive';

@Component({
  selector: 'app-button-docs',
  standalone: true,
  imports: [UsliButtonComponent, DraggableDirective],
  templateUrl: './button-docs.html',
  styleUrl: './button-docs.scss',
})
export class ButtonDocs {}
