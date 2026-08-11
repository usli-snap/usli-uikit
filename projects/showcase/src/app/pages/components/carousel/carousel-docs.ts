import { Component } from '@angular/core';
import { UsliCarouselComponent, UsliCarouselItemComponent } from 'ui-sdk';

@Component({
  selector: 'app-carousel-docs',
  standalone: true,
  imports: [UsliCarouselComponent, UsliCarouselItemComponent],
  templateUrl: './carousel-docs.html',
  styleUrl: './carousel-docs.scss',
})
export class CarouselDocs {}
