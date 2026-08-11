import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem { label: string; path?: string; exact?: boolean; items?: NavItem[]; }
interface NavSection { title: string; items: NavItem[]; }

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  sections: NavSection[] = [
    {
      title: 'Getting Started',
      items: [
        { label: 'Introduction', path: '/', exact: true },
      ],
    },
    {
      title: 'Components',
      items: [
        { label: 'Button',  path: '/components/button' },
        { label: 'Badge',   path: '/components/badge' },
        { label: 'Alert',   path: '/components/alert' },
        { label: 'Card',    path: '/components/card' },
        { label: 'Spinner', path: '/components/spinner' },
        { label: 'Tabs',      path: '/components/tabs' },
        { label: 'Accordion', path: '/components/accordion' },
        { label: 'Breadcrumb', path: '/components/breadcrumb' },
        { label: 'Placeholder', path: '/components/placeholder' },
        { label: 'Progress', path: '/components/progress' },
        { label: 'List Group', path: '/components/list-group' },
        { label: 'Button Group', path: '/components/button-group' },
        { label: 'Pagination', path: '/components/pagination' },
        { label: 'Tooltip', path: '/components/tooltip' },
        { label: 'Dropdown', path: '/components/dropdown' },
        { label: 'Modal', path: '/components/modal' },
        { label: 'Offcanvas', path: '/components/offcanvas' },
        { label: 'Popover', path: '/components/popover' },
        { label: 'Toast', path: '/components/toast' },
        { label: 'Carousel', path: '/components/carousel' },
        { label: 'Scrollspy', path: '/components/scrollspy' },
        {
          label: 'Form Elements',
          items: [
            { label: 'Input',    path: '/components/forms/input' },
            { label: 'Textarea', path: '/components/forms/textarea' },
            { label: 'Select',   path: '/components/forms/select' },
            { label: 'Checkbox', path: '/components/forms/checkbox' },
            { label: 'Radio Group', path: '/components/forms/radio-group' },
            { label: 'Form Field', path: '/components/forms/form-field' },
            { label: 'Input Group', path: '/components/forms/input-group' },
            { label: 'Range', path: '/components/forms/range' },
          ],
        },
      ],
    },
    {
      title: 'Design System',
      items: [
        { label: 'Colors',      path: '/design/colors' },
        { label: 'Typography',  path: '/design/typography' },
      ],
    },
  ];
}
