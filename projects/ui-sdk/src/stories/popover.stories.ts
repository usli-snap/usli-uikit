import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { UsliButtonComponent, UsliPopoverComponent } from 'ui-sdk';

const meta: Meta<UsliPopoverComponent> = {
  title: 'Components/Popover',
  component: UsliPopoverComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [UsliButtonComponent] })],
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'start', 'end'] },
  },
  args: {
    title: 'Popover title',
  },
};

export default meta;
type Story = StoryObj<UsliPopoverComponent>;

export const Default: Story = {
  render: (args) => ({
    props: { ...args, id: 'story-popover' },
    template: `
      <div style="padding: 4rem;">
        <usli-button commandFor="story-popover" command="toggle-popover">Click me</usli-button>
        <usli-popover [id]="id" [title]="title" [placement]="placement">
          This is some popover content with more detail than a tooltip.
        </usli-popover>
      </div>
    `,
  }),
};
