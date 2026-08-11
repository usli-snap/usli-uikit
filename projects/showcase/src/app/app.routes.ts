import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'components/button',
    loadComponent: () => import('./pages/components/button/button-docs').then(m => m.ButtonDocs),
  },
  {
    path: 'components/badge',
    loadComponent: () => import('./pages/components/badge/badge-docs').then(m => m.BadgeDocs),
  },
  {
    path: 'components/alert',
    loadComponent: () => import('./pages/components/alert/alert-docs').then(m => m.AlertDocs),
  },
  {
    path: 'components/card',
    loadComponent: () => import('./pages/components/card/card-docs').then(m => m.CardDocs),
  },
  {
    path: 'components/spinner',
    loadComponent: () => import('./pages/components/spinner/spinner-docs').then(m => m.SpinnerDocs),
  },
  {
    path: 'design/colors',
    loadComponent: () => import('./pages/design/colors/colors-docs').then(m => m.ColorsDocs),
  },
  {
    path: 'design/typography',
    loadComponent: () => import('./pages/design/typography/typography-docs').then(m => m.TypographyDocs),
  },
  {
    path: 'components/tabs',
    loadComponent: () => import('./pages/components/tabs/tabs-docs').then(m => m.TabsDocs),
  },
  {
    path: 'components/accordion',
    loadComponent: () =>
      import('./pages/components/accordion/accordion-docs').then(m => m.AccordionDocs),
  },
  {
    path: 'components/breadcrumb',
    loadComponent: () =>
      import('./pages/components/breadcrumb/breadcrumb-docs').then(m => m.BreadcrumbDocs),
  },
  {
    path: 'components/placeholder',
    loadComponent: () =>
      import('./pages/components/placeholder/placeholder-docs').then(m => m.PlaceholderDocs),
  },
  {
    path: 'components/progress',
    loadComponent: () =>
      import('./pages/components/progress/progress-docs').then(m => m.ProgressDocs),
  },
  {
    path: 'components/list-group',
    loadComponent: () =>
      import('./pages/components/list-group/list-group-docs').then(m => m.ListGroupDocs),
  },
  {
    path: 'components/button-group',
    loadComponent: () =>
      import('./pages/components/button-group/button-group-docs').then(m => m.ButtonGroupDocs),
  },
  {
    path: 'components/pagination',
    loadComponent: () =>
      import('./pages/components/pagination/pagination-docs').then(m => m.PaginationDocs),
  },
  {
    path: 'components/forms/input',
    loadComponent: () => import('./pages/components/forms/input/input-docs').then(m => m.InputDocs),
    data: { name: 'input-docs' },
  },
  {
    path: 'components/forms/textarea',
    loadComponent: () => import('./pages/components/forms/textarea/textarea-docs').then(m => m.TextareaDocs),
    data: { name: 'textarea-docs' },
  },
  {
    path: 'components/forms/select',
    loadComponent: () => import('./pages/components/forms/select/select-docs').then(m => m.SelectDocs),
    data: { name: 'select-docs' },
  },
  {
    path: 'components/forms/checkbox',
    loadComponent: () => import('./pages/components/forms/checkbox/checkbox-docs').then(m => m.CheckboxDocs),
    data: { name: 'checkbox-docs' },
  },
  {
    path: 'components/forms/radio-group',
    loadComponent: () => import('./pages/components/forms/radio-group/radio-group-docs').then(m => m.RadioGroupDocs),
    data: { name: 'radio-group-docs' },
  },
  {
    path: 'components/forms/form-field',
    loadComponent: () => import('./pages/components/forms/form-field/form-field-docs').then(m => m.FormFieldDocs),
    data: { name: 'form-field-docs' },
  },
  {
    path: 'components/scrollspy',
    loadComponent: () =>
      import('./pages/components/scrollspy/scrollspy-docs').then(m => m.ScrollspyDocs),
  },
  {
    path: 'components/carousel',
    loadComponent: () =>
      import('./pages/components/carousel/carousel-docs').then(m => m.CarouselDocs),
  },
  {
    path: 'components/toast',
    loadComponent: () =>
      import('./pages/components/toast/toast-docs').then(m => m.ToastDocs),
  },
  {
    path: 'components/popover',
    loadComponent: () =>
      import('./pages/components/popover/popover-docs').then(m => m.PopoverDocs),
  },
  {
    path: 'components/offcanvas',
    loadComponent: () =>
      import('./pages/components/offcanvas/offcanvas-docs').then(m => m.OffcanvasDocs),
  },
  {
    path: 'components/modal',
    loadComponent: () =>
      import('./pages/components/modal/modal-docs').then(m => m.ModalDocs),
  },
  {
    path: 'components/dropdown',
    loadComponent: () =>
      import('./pages/components/dropdown/dropdown-docs').then(m => m.DropdownDocs),
  },
  {
    path: 'components/tooltip',
    loadComponent: () =>
      import('./pages/components/tooltip/tooltip-docs').then(m => m.TooltipDocs),
  },
  {
    path: 'components/forms/range',
    loadComponent: () =>
      import('./pages/components/forms/range/range-docs').then(m => m.RangeDocs),
    data: { name: 'range-docs' },
  },
  {
    path: 'components/forms/input-group',
    loadComponent: () =>
      import('./pages/components/forms/input-group/input-group-docs').then(m => m.InputGroupDocs),
    data: { name: 'input-group-docs' },
  },
  { path: '**', redirectTo: '' },
];
