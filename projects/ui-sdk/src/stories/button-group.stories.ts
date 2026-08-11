import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { UsliButtonComponent, UsliButtonGroupComponent } from 'ui-sdk';

const meta: Meta<UsliButtonGroupComponent> = {
  title: 'Components/Button Group',
  component: UsliButtonGroupComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [UsliButtonComponent] })],
  argTypes: {
    size: { control: 'select', options: [undefined, 'small', 'medium', 'large'] },
    vertical: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<UsliButtonGroupComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <usli-button-group [vertical]="vertical" [size]="size" [ariaLabel]="ariaLabel">
        <usli-button variant="secondary">Left</usli-button>
        <usli-button variant="secondary">Middle</usli-button>
        <usli-button variant="secondary">Right</usli-button>
      </usli-button-group>
    `,
  }),
};

export const Vertical: Story = { args: { vertical: true } };
