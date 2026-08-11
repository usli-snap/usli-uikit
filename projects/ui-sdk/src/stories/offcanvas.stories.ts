import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { UsliButtonComponent, UsliOffcanvasComponent } from 'ui-sdk';

const meta: Meta<UsliOffcanvasComponent> = {
  title: 'Components/Offcanvas',
  component: UsliOffcanvasComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [UsliButtonComponent] })],
  argTypes: {
    placement: { control: 'select', options: ['start', 'end', 'top', 'bottom'] },
  },
};

export default meta;
type Story = StoryObj<UsliOffcanvasComponent>;

function panelStory(id: string): Story {
  return {
    render: (args) => ({
      props: { ...args, id },
      template: `
        <usli-button [commandFor]="id" command="show-modal">Open panel</usli-button>
        <usli-offcanvas [id]="id" [placement]="placement" title="Filters">
          Panel content goes here.
        </usli-offcanvas>
      `,
    }),
  };
}

export const Start: Story = { ...panelStory('story-offcanvas-start'), args: { placement: 'start' } };
export const End: Story = { ...panelStory('story-offcanvas-end'), args: { placement: 'end' } };
export const Bottom: Story = { ...panelStory('story-offcanvas-bottom'), args: { placement: 'bottom' } };
