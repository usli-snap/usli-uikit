import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';

interface TypeRole {
  label: string;
  sample: string;
  spec: string;
  fontSize: string;
  fontWeight: number;
  fontFamily: string;
  textTransform?: string;
  letterSpacing?: string;
  divider?: boolean;
}

const ROBOTO = `'Roboto', sans-serif`;
const OPEN_SANS = `'Open Sans', sans-serif`;

const roles: TypeRole[] = [
  { label: 'H1 Head',    sample: 'The quick brown fox',   spec: 'Roboto · Light 300 · 3rem',        fontSize: '3rem',     fontWeight: 300, fontFamily: ROBOTO },
  { label: 'H2 Headline', sample: 'The quick brown fox',  spec: 'Roboto · Light 300 · 2.5rem',      fontSize: '2.5rem',   fontWeight: 300, fontFamily: ROBOTO },
  { label: 'H3 Headline', sample: 'The quick brown fox',  spec: 'Roboto · Regular 400 · 2rem',      fontSize: '2rem',     fontWeight: 400, fontFamily: ROBOTO },
  { label: 'H4 Headline', sample: 'The quick brown fox',  spec: 'Roboto · Regular 400 · 1.5rem',    fontSize: '1.5rem',   fontWeight: 400, fontFamily: ROBOTO },
  { label: 'H5 Headline', sample: 'The quick brown fox',  spec: 'Roboto · Regular 400 · 1.25rem',   fontSize: '1.25rem',  fontWeight: 400, fontFamily: ROBOTO },
  { label: 'H6 Headline', sample: 'The quick brown fox',  spec: 'Roboto · Medium 500 · 1rem',       fontSize: '1rem',     fontWeight: 500, fontFamily: ROBOTO, divider: true },
  { label: 'Body 1',      sample: 'The quick brown fox jumps over the lazy dog.', spec: 'Roboto · Regular 400 · 1rem',   fontSize: '1rem',     fontWeight: 400, fontFamily: ROBOTO },
  { label: 'Body 2',      sample: 'The quick brown fox jumps over the lazy dog.', spec: 'Roboto · Regular 400 · 0.875rem', fontSize: '0.875rem', fontWeight: 400, fontFamily: ROBOTO, divider: true },
  { label: 'Subtitle 2',  sample: 'Section title or supporting label',            spec: 'Roboto · Medium 500 · 0.875rem', fontSize: '0.875rem', fontWeight: 500, fontFamily: ROBOTO },
  { label: 'Caption',     sample: 'Helper text or annotation',                    spec: 'Roboto · Regular 400 · 0.75rem', fontSize: '0.75rem',  fontWeight: 400, fontFamily: ROBOTO },
  { label: 'Button',      sample: 'CALL TO ACTION',                               spec: 'Roboto · Medium 500 · 0.875rem · Uppercase', fontSize: '0.875rem', fontWeight: 500, fontFamily: ROBOTO, textTransform: 'uppercase', letterSpacing: '0.08em' },
  { label: 'Overline',    sample: 'SECTION LABEL',                                spec: 'Roboto · Regular 400 · 0.625rem · Uppercase', fontSize: '0.625rem', fontWeight: 400, fontFamily: ROBOTO, textTransform: 'uppercase', letterSpacing: '0.15em' },
];

const openSansRoles: TypeRole[] = [
  { label: 'H1 Head',     sample: 'The quick brown fox',   spec: 'Open Sans · Light 300 · 3rem',        fontSize: '3rem',     fontWeight: 300, fontFamily: OPEN_SANS },
  { label: 'H2 Headline', sample: 'The quick brown fox',   spec: 'Open Sans · Light 300 · 2.5rem',      fontSize: '2.5rem',   fontWeight: 300, fontFamily: OPEN_SANS },
  { label: 'H3 Headline', sample: 'The quick brown fox',   spec: 'Open Sans · Regular 400 · 2rem',      fontSize: '2rem',     fontWeight: 400, fontFamily: OPEN_SANS },
  { label: 'H4 Headline', sample: 'The quick brown fox',   spec: 'Open Sans · Regular 400 · 1.5rem',    fontSize: '1.5rem',   fontWeight: 400, fontFamily: OPEN_SANS },
  { label: 'H5 Headline', sample: 'The quick brown fox',   spec: 'Open Sans · Regular 400 · 1.25rem',   fontSize: '1.25rem',  fontWeight: 400, fontFamily: OPEN_SANS },
  { label: 'H6 Headline', sample: 'The quick brown fox',   spec: 'Open Sans · SemiBold 600 · 1rem',     fontSize: '1rem',     fontWeight: 600, fontFamily: OPEN_SANS, divider: true },
  { label: 'Body 1',      sample: 'The quick brown fox jumps over the lazy dog.', spec: 'Open Sans · Regular 400 · 1rem',      fontSize: '1rem',     fontWeight: 400, fontFamily: OPEN_SANS },
  { label: 'Body 2',      sample: 'The quick brown fox jumps over the lazy dog.', spec: 'Open Sans · Regular 400 · 0.875rem',  fontSize: '0.875rem', fontWeight: 400, fontFamily: OPEN_SANS, divider: true },
  { label: 'Subtitle 2',  sample: 'Section title or supporting label',            spec: 'Open Sans · SemiBold 600 · 0.875rem', fontSize: '0.875rem', fontWeight: 600, fontFamily: OPEN_SANS },
  { label: 'Caption',     sample: 'Helper text or annotation',                    spec: 'Open Sans · Regular 400 · 0.75rem',   fontSize: '0.75rem',  fontWeight: 400, fontFamily: OPEN_SANS },
  { label: 'Button',      sample: 'CALL TO ACTION',                               spec: 'Open Sans · SemiBold 600 · 0.875rem · Uppercase', fontSize: '0.875rem', fontWeight: 600, fontFamily: OPEN_SANS, textTransform: 'uppercase', letterSpacing: '0.08em' },
  { label: 'Overline',    sample: 'SECTION LABEL',                                spec: 'Open Sans · Regular 400 · 0.625rem · Uppercase', fontSize: '0.625rem', fontWeight: 400, fontFamily: OPEN_SANS, textTransform: 'uppercase', letterSpacing: '0.15em' },
];

@Component({
  selector: 'usli-typography-story',
  standalone: true,
  styles: [`
    .page { padding: 2rem 3rem; background: #fafafa; min-height: 100vh; }
    h1 { font-family: 'Roboto', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #757575; margin: 0 0 0.25rem; }
    .font-section { margin-bottom: 3rem; }
    .section-rule { border: none; border-top: 2px solid #e0e0e0; margin: 2.5rem 0; }
    .row {
      display: grid;
      grid-template-columns: 140px 1fr 260px;
      align-items: baseline;
      gap: 1.5rem;
      padding: 1rem 0;
      border-bottom: 1px solid #eeeeee;
    }
    .row.divider-above { border-top: 1px solid #bdbdbd; margin-top: 0.5rem; padding-top: 1.25rem; }
    .role-label { font-family: 'Roboto', sans-serif; font-size: 0.75rem; font-weight: 500; color: #757575; white-space: nowrap; }
    .spec { font-family: 'Roboto', sans-serif; font-size: 0.7rem; color: #9e9e9e; text-align: right; }
  `],
  template: `
    <div class="page">
      <div class="font-section">
        <h1>Roboto</h1>
        @for (role of robotoRoles; track role.label) {
          <div class="row" [class.divider-above]="role.divider">
            <span class="role-label">{{ role.label }}</span>
            <span [style.font-family]="role.fontFamily"
                  [style.font-size]="role.fontSize"
                  [style.font-weight]="role.fontWeight"
                  [style.text-transform]="role.textTransform || 'none'"
                  [style.letter-spacing]="role.letterSpacing || 'normal'">
              {{ role.sample }}
            </span>
            <span class="spec">{{ role.spec }}</span>
          </div>
        }
      </div>

      <hr class="section-rule" />

      <div class="font-section">
        <h1>Open Sans</h1>
        @for (role of openSansRoles; track role.label) {
          <div class="row" [class.divider-above]="role.divider">
            <span class="role-label">{{ role.label }}</span>
            <span [style.font-family]="role.fontFamily"
                  [style.font-size]="role.fontSize"
                  [style.font-weight]="role.fontWeight"
                  [style.text-transform]="role.textTransform || 'none'"
                  [style.letter-spacing]="role.letterSpacing || 'normal'">
              {{ role.sample }}
            </span>
            <span class="spec">{{ role.spec }}</span>
          </div>
        }
      </div>
    </div>
  `,
})
class TypographyStoryComponent {
  robotoRoles = roles;
  openSansRoles = openSansRoles;
}

const meta: Meta<TypographyStoryComponent> = {
  title: 'Design System/Typography',
  component: TypographyStoryComponent,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TypographyStoryComponent>;

export const Scale: Story = {};
