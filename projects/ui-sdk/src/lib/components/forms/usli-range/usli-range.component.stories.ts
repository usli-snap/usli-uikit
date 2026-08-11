import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { UsliRangeComponent } from './usli-range.component';

const IMPORTS = [ReactiveFormsModule];

const meta: Meta<UsliRangeComponent> = {
  component: UsliRangeComponent,
  title: 'Form Components/Range',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: IMPORTS })],
};

export default meta;
type Story = StoryObj<UsliRangeComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      ctrl: new FormControl(50),
    },
    template: `<usli-range [formControl]="ctrl" />`,
  }),
};

export const WithLiveValue: Story = {
  render: (args) => ({
    props: {
      ...args,
      ctrl: new FormControl(25),
    },
    template: `<usli-range [formControl]="ctrl" [showValue]="true" />`,
  }),
};

export const CustomRange: Story = {
  render: (args) => ({
    props: {
      ...args,
      ctrl: new FormControl(10),
    },
    template: `<usli-range [formControl]="ctrl" [min]="0" [max]="20" [step]="2" [showValue]="true" />`,
  }),
};

export const Disabled: Story = {
  render: (args) => ({
    props: {
      ...args,
      ctrl: new FormControl({ value: 40, disabled: true }),
    },
    template: `<usli-range [formControl]="ctrl" [showValue]="true" />`,
  }),
};
