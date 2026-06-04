import { Component } from '@angular/core';

interface TypeRow {
  label: string;
  sample: string;
  robotoSpec: string;
  openSansSpec: string;
  fontSize: string;
  robotoWeight: number;
  openSansWeight: number;
  transform?: string;
  spacing?: string;
  divider?: boolean;
}

const rows: TypeRow[] = [
  { label: 'H1',         sample: 'The quick brown fox',                           robotoSpec: 'Light 300 · 3rem',        openSansSpec: 'Light 300 · 3rem',        fontSize: '3rem',     robotoWeight: 300, openSansWeight: 300 },
  { label: 'H2',         sample: 'The quick brown fox',                           robotoSpec: 'Light 300 · 2.5rem',      openSansSpec: 'Light 300 · 2.5rem',      fontSize: '2.5rem',   robotoWeight: 300, openSansWeight: 300 },
  { label: 'H3',         sample: 'The quick brown fox',                           robotoSpec: 'Regular 400 · 2rem',      openSansSpec: 'Regular 400 · 2rem',      fontSize: '2rem',     robotoWeight: 400, openSansWeight: 400 },
  { label: 'H4',         sample: 'The quick brown fox',                           robotoSpec: 'Regular 400 · 1.5rem',    openSansSpec: 'Regular 400 · 1.5rem',    fontSize: '1.5rem',   robotoWeight: 400, openSansWeight: 400 },
  { label: 'H5',         sample: 'The quick brown fox',                           robotoSpec: 'Regular 400 · 1.25rem',   openSansSpec: 'Regular 400 · 1.25rem',   fontSize: '1.25rem',  robotoWeight: 400, openSansWeight: 400 },
  { label: 'H6',         sample: 'The quick brown fox',                           robotoSpec: 'Medium 500 · 1rem',       openSansSpec: 'SemiBold 600 · 1rem',     fontSize: '1rem',     robotoWeight: 500, openSansWeight: 600, divider: true },
  { label: 'Body 1',     sample: 'The quick brown fox jumps over the lazy dog.',  robotoSpec: 'Regular 400 · 1rem',      openSansSpec: 'Regular 400 · 1rem',      fontSize: '1rem',     robotoWeight: 400, openSansWeight: 400 },
  { label: 'Body 2',     sample: 'The quick brown fox jumps over the lazy dog.',  robotoSpec: 'Regular 400 · 0.875rem',  openSansSpec: 'Regular 400 · 0.875rem',  fontSize: '0.875rem', robotoWeight: 400, openSansWeight: 400, divider: true },
  { label: 'Subtitle 2', sample: 'Section title or supporting label',             robotoSpec: 'Medium 500 · 0.875rem',   openSansSpec: 'SemiBold 600 · 0.875rem', fontSize: '0.875rem', robotoWeight: 500, openSansWeight: 600 },
  { label: 'Caption',    sample: 'Helper text or annotation',                     robotoSpec: 'Regular 400 · 0.75rem',   openSansSpec: 'Regular 400 · 0.75rem',   fontSize: '0.75rem',  robotoWeight: 400, openSansWeight: 400 },
  { label: 'Button',     sample: 'Call to action',                                robotoSpec: 'Medium 500 · 0.875rem',   openSansSpec: 'SemiBold 600 · 0.875rem', fontSize: '0.875rem', robotoWeight: 500, openSansWeight: 600, transform: 'uppercase', spacing: '0.08em' },
  { label: 'Overline',   sample: 'Section label',                                 robotoSpec: 'Regular 400 · 0.625rem',  openSansSpec: 'Regular 400 · 0.625rem',  fontSize: '0.625rem', robotoWeight: 400, openSansWeight: 400, transform: 'uppercase', spacing: '0.15em' },
];

@Component({
  selector: 'app-typography-docs',
  standalone: true,
  templateUrl: './typography-docs.html',
  styleUrl: './typography-docs.scss',
})
export class TypographyDocs {
  rows = rows;
}
