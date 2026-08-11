import type { Meta, StoryObj } from '@storybook/angular';

import { UsliProgressComponent } from 'ui-sdk';

const meta: Meta<UsliProgressComponent> = {
  title: 'Components/Progress',
  component: UsliProgressComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [undefined, 'primary', 'secondary', 'tertiary', 'error', 'warning', 'info', 'success'],
    },
    striped: { control: 'boolean' },
    animated: { control: 'boolean' },
    showLabel: { control: 'boolean' },
  },
  args: {
    value: 60,
    max: 100,
  },
};

export default meta;
type Story = StoryObj<UsliProgressComponent>;

export const Default: Story = {};
export const Striped: Story = { args: { striped: true } };
export const Animated: Story = { args: { animated: true } };
export const WithLabel: Story = { args: { showLabel: true } };
export const Success: Story = { args: { variant: 'success', value: 90 } };
