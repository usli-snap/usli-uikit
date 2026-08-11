import type { Meta, StoryObj } from '@storybook/angular';

import { UsliToastComponent } from 'ui-sdk';

const meta: Meta<UsliToastComponent> = {
  title: 'Components/Toast',
  component: UsliToastComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['error', 'warning', 'info', 'success'] },
  },
  args: {
    variant: 'info',
    title: 'Notification',
    autohide: false,
  },
};

export default meta;
type Story = StoryObj<UsliToastComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="toast-container position-static">
        <usli-toast [variant]="variant" [title]="title" [autohide]="autohide" [delay]="delay" [dismissible]="dismissible">
          Your changes have been saved.
        </usli-toast>
      </div>
    `,
  }),
};

export const Success: Story = { args: { variant: 'success', title: 'Saved' } };
export const AutoHide: Story = { args: { autohide: true, delay: 3000 } };
