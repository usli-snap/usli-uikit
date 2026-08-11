import { Component } from '@angular/core';
import { UsliListGroupComponent, UsliListGroupItemComponent } from 'ui-sdk';

@Component({
  selector: 'app-list-group-docs',
  standalone: true,
  imports: [UsliListGroupComponent, UsliListGroupItemComponent],
  templateUrl: './list-group-docs.html',
  styleUrl: './list-group-docs.scss',
})
export class ListGroupDocs {}
