import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { UsliCarouselComponent, UsliCarouselItemComponent } from 'ui-sdk';

const meta: Meta<UsliCarouselComponent> = {
  title: 'Components/Carousel',
  component: UsliCarouselComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [UsliCarouselItemComponent] })],
  argTypes: {
    wrap: { control: 'boolean' },
    pauseOnHover: { control: 'boolean' },
    showIndicators: { control: 'boolean' },
    showControls: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<UsliCarouselComponent>;

const slideStyle = 'display:flex; align-items:center; justify-content:center; height:220px; color:var(--white, #ffffff); font-size:1.5rem;';

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <usli-carousel [interval]="interval" [wrap]="wrap" [pauseOnHover]="pauseOnHover" [showIndicators]="showIndicators" [showControls]="showControls">
        <usli-carousel-item><div style="${slideStyle} background:var(--blue-500, #00338e);">Slide 1</div></usli-carousel-item>
        <usli-carousel-item><div style="${slideStyle} background:var(--blue-300, #4d78c9);">Slide 2</div></usli-carousel-item>
        <usli-carousel-item><div style="${slideStyle} background:var(--success-500, #14661a);">Slide 3</div></usli-carousel-item>
      </usli-carousel>
    `,
  }),
};

export const Autoplay: Story = { args: { interval: 2000 } };
export const NoWrap: Story = { args: { wrap: false } };
