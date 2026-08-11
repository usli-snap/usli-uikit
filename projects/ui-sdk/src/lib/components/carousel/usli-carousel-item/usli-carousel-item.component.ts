import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { USLI_CAROUSEL } from '../carousel.token';

@Component({
  selector: 'usli-carousel-item',
  standalone: true,
  templateUrl: './usli-carousel-item.component.html',
  styleUrl: './usli-carousel-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsliCarouselItemComponent {
  private readonly group = inject(USLI_CAROUSEL);

  protected isActive = computed(() => this.group.activeIndex() === this.group.indexOf(this));
}
