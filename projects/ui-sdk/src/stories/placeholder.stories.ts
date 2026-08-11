import type { Meta, StoryObj } from '@storybook/angular';

import { UsliPlaceholderComponent } from 'ui-sdk';

const meta: Meta<UsliPlaceholderComponent> = {
  title: 'Components/Placeholder',
  component: UsliPlaceholderComponent,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: [undefined, 'xs', 'sm', 'lg'] },
    animation: { control: 'select', options: [undefined, 'glow', 'wave'] },
    block: { control: 'boolean' },
    width: { control: 'text' },
  },
  args: {
    width: '6rem',
  },
};

export default meta;
type Story = StoryObj<UsliPlaceholderComponent>;

export const Default: Story = {};
export const Glow: Story = { args: { animation: 'glow' } };
export const Wave: Story = { args: { animation: 'wave' } };
export const BlockLines: Story = {
  render: () => ({
    template: `
      <usli-placeholder width="100%" [block]="true"></usli-placeholder>
      <usli-placeholder width="75%" [block]="true"></usli-placeholder>
      <usli-placeholder width="50%" [block]="true"></usli-placeholder>
    `,
  }),
};
