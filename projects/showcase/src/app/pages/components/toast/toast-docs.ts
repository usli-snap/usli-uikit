import { Component } from '@angular/core';
import { UsliToastComponent } from 'ui-sdk';

@Component({
  selector: 'app-toast-docs',
  standalone: true,
  imports: [UsliToastComponent],
  templateUrl: './toast-docs.html',
  styleUrl: './toast-docs.scss',
})
export class ToastDocs {}
