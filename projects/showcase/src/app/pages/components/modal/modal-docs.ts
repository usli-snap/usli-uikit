import { Component } from '@angular/core';
import { UsliButtonComponent, UsliModalComponent } from 'ui-sdk';

@Component({
  selector: 'app-modal-docs',
  standalone: true,
  imports: [UsliButtonComponent, UsliModalComponent],
  templateUrl: './modal-docs.html',
  styleUrl: './modal-docs.scss',
})
export class ModalDocs {}
