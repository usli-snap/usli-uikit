import type { Meta, StoryObj } from '@storybook/angular';

import { UsliDropdownComponent } from 'ui-sdk';

const meta: Meta<UsliDropdownComponent> = {
  title: 'Components/Dropdown',
  component: UsliDropdownComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'error', 'warning', 'info', 'success'],
    },
    align: { control: 'select', options: ['start', 'end'] },
  },
  args: {
    label: 'Actions',
  },
};

export default meta;
type Story = StoryObj<UsliDropdownComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <usli-dropdown [label]="label" [variant]="variant" [align]="align" [disabled]="disabled">
        <a class="dropdown-item" href="#">Edit</a>
        <a class="dropdown-item" href="#">Duplicate</a>
        <hr class="dropdown-divider" />
        <a class="dropdown-item" href="#">Delete</a>
      </usli-dropdown>
    `,
  }),
};

export const AlignedEnd: Story = { args: { align: 'end' } };
export const Disabled: Story = { args: { disabled: true } };
