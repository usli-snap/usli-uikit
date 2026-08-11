import type { Meta, StoryObj } from '@storybook/angular';

import { UsliBreadcrumbComponent } from 'ui-sdk';

const meta: Meta<UsliBreadcrumbComponent> = {
  title: 'Components/Breadcrumb',
  component: UsliBreadcrumbComponent,
  tags: ['autodocs'],
  args: {
    items: [{ label: 'Home', href: '/' }, { label: 'Components', href: '/components' }, { label: 'Breadcrumb' }],
  },
};

export default meta;
type Story = StoryObj<UsliBreadcrumbComponent>;

export const Default: Story = {};

export const TwoLevels: Story = {
  args: { items: [{ label: 'Home', href: '/' }, { label: 'Components' }] },
};
