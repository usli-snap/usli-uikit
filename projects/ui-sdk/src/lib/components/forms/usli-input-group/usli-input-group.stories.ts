import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UsliInputGroupComponent } from './usli-input-group.component';

const meta: Meta<UsliInputGroupComponent> = {
  component: UsliInputGroupComponent,
  title: 'Form Components/Input Group',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [] })],
  argTypes: {
    size: { control: 'select', options: [undefined, 'sm', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<UsliInputGroupComponent>;

export const TextPrepend: Story = {
  render: (args) => ({
    props: args,
    template: `
      <usli-input-group [size]="size">
        <span usliPrepend class="input-group-text">@</span>
        <input class="form-control" placeholder="username" />
      </usli-input-group>
    `,
  }),
};

export const ButtonAppend: Story = {
  render: (args) => ({
    props: args,
    template: `
      <usli-input-group [size]="size">
        <input class="form-control" placeholder="Search" />
        <button usliAppend class="btn btn-usli-primary" type="button">Go</button>
      </usli-input-group>
    `,
  }),
};

export const PrependAndAppend: Story = {
  render: (args) => ({
    props: args,
    template: `
      <usli-input-group [size]="size">
        <span usliPrepend class="input-group-text">$</span>
        <input class="form-control" />
        <span usliAppend class="input-group-text">.00</span>
      </usli-input-group>
    `,
  }),
};
