import type { Meta, StoryObj } from '@storybook/angular';

import { UsliPaginationComponent } from 'ui-sdk';

const meta: Meta<UsliPaginationComponent> = {
  title: 'Components/Pagination',
  component: UsliPaginationComponent,
  tags: ['autodocs'],
  args: {
    totalPages: 10,
    page: 4,
    siblingCount: 1,
    boundaryCount: 1,
  },
};

export default meta;
type Story = StoryObj<UsliPaginationComponent>;

export const Default: Story = {};
export const ManyPages: Story = { args: { totalPages: 50, page: 25 } };
export const Disabled: Story = { args: { disabled: true } };
