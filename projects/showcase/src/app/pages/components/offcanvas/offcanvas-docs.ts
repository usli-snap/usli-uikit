import { Component } from '@angular/core';
import { UsliButtonComponent, UsliOffcanvasComponent } from 'ui-sdk';

@Component({
  selector: 'app-offcanvas-docs',
  standalone: true,
  imports: [UsliButtonComponent, UsliOffcanvasComponent],
  templateUrl: './offcanvas-docs.html',
  styleUrl: './offcanvas-docs.scss',
})
export class OffcanvasDocs {}
