import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsliRangeComponent } from 'ui-sdk';

@Component({
  selector: 'app-range-docs',
  standalone: true,
  imports: [UsliRangeComponent, ReactiveFormsModule],
  templateUrl: './range-docs.html',
  styleUrl: './range-docs.scss',
})
export class RangeDocs {
  protected volume = new FormControl(50);
  protected step = new FormControl(10);
}
