import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { UsliListGroupComponent, UsliListGroupItemComponent } from 'ui-sdk';

const meta: Meta<UsliListGroupComponent> = {
  title: 'Components/List Group',
  component: UsliListGroupComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [UsliListGroupItemComponent] })],
};

export default meta;
type Story = StoryObj<UsliListGroupComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <usli-list-group>
        <usli-list-group-item>First item</usli-list-group-item>
        <usli-list-group-item [active]="true">Second item (active)</usli-list-group-item>
        <usli-list-group-item [disabled]="true">Third item (disabled)</usli-list-group-item>
      </usli-list-group>
    `,
  }),
};

export const Linked: Story = {
  render: () => ({
    template: `
      <usli-list-group>
        <usli-list-group-item href="#a">Go to A</usli-list-group-item>
        <usli-list-group-item href="#b">Go to B</usli-list-group-item>
      </usli-list-group>
    `,
  }),
};

export const Numbered: Story = {
  render: () => ({
    template: `
      <usli-list-group [numbered]="true">
        <usli-list-group-item>First</usli-list-group-item>
        <usli-list-group-item>Second</usli-list-group-item>
        <usli-list-group-item>Third</usli-list-group-item>
      </usli-list-group>
    `,
  }),
};
