import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { UsliButtonComponent, UsliTooltipDirective } from 'ui-sdk';

const meta: Meta = {
  title: 'Components/Tooltip',
  decorators: [moduleMetadata({ imports: [UsliButtonComponent, UsliTooltipDirective] })],
};

export default meta;
type Story = StoryObj;

export const Top: Story = {
  render: () => ({
    template: `<usli-button usliTooltip="Saved to your library">Hover me</usli-button>`,
  }),
};

export const Placements: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:2rem; padding:3rem;">
        <usli-button usliTooltip="Top tooltip" tooltipPlacement="top">Top</usli-button>
        <usli-button usliTooltip="Bottom tooltip" tooltipPlacement="bottom">Bottom</usli-button>
        <usli-button usliTooltip="Start tooltip" tooltipPlacement="start">Start</usli-button>
        <usli-button usliTooltip="End tooltip" tooltipPlacement="end">End</usli-button>
      </div>
    `,
  }),
};
