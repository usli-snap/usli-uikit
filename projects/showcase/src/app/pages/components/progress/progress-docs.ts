import { Component } from '@angular/core';
import { UsliProgressComponent } from 'ui-sdk';

@Component({
  selector: 'app-progress-docs',
  standalone: true,
  imports: [UsliProgressComponent],
  templateUrl: './progress-docs.html',
  styleUrl: './progress-docs.scss',
})
export class ProgressDocs {}
