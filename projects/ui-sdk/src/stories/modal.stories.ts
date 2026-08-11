import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { UsliButtonComponent, UsliModalComponent } from 'ui-sdk';

const meta: Meta<UsliModalComponent> = {
  title: 'Components/Modal',
  component: UsliModalComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [UsliButtonComponent] })],
  argTypes: {
    size: { control: 'select', options: [undefined, 'sm', 'lg', 'xl'] },
  },
};

export default meta;
type Story = StoryObj<UsliModalComponent>;

export const Default: Story = {
  render: (args) => ({
    props: { ...args, open: false, id: 'story-modal' },
    template: `
      <usli-button commandFor="story-modal" command="show-modal">Open modal</usli-button>
      <usli-modal [id]="id" title="Confirm action" [size]="size" [centered]="centered">
        Are you sure you want to continue?
        <div usliModalFooter class="modal-footer">
          <usli-button variant="secondary" commandFor="story-modal" command="close">Cancel</usli-button>
          <usli-button variant="primary" commandFor="story-modal" command="close">Confirm</usli-button>
        </div>
      </usli-modal>
    `,
  }),
};

export const StaticBackdrop: Story = {
  render: (args) => ({
    props: { ...args, id: 'story-modal-static' },
    template: `
      <usli-button commandFor="story-modal-static" command="show-modal">Open static modal</usli-button>
      <usli-modal [id]="id" title="Can't dismiss by clicking outside" [staticBackdrop]="true">
        Use the close button or press Escape's not enough — this one is fully static.
      </usli-modal>
    `,
  }),
};
