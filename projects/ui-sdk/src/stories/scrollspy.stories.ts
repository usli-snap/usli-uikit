import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { UsliListGroupComponent, UsliListGroupItemComponent, UsliScrollspyDirective } from 'ui-sdk';

const meta: Meta = {
  title: 'Components/Scrollspy',
  decorators: [
    moduleMetadata({ imports: [UsliScrollspyDirective, UsliListGroupComponent, UsliListGroupItemComponent] }),
  ],
};

export default meta;
type Story = StoryObj;

const sectionStyle = 'height: 180px; padding: 1rem; border-bottom: 1px solid var(--gray-300, #e0e0e0);';

export const Default: Story = {
  render: () => ({
    props: { activeId: undefined, targets: ['spy-one', 'spy-two', 'spy-three'] },
    template: `
      <div style="display:flex; gap:1rem;">
        <usli-list-group style="width: 160px; flex-shrink: 0;">
          <usli-list-group-item [active]="activeId === 'spy-one'">One</usli-list-group-item>
          <usli-list-group-item [active]="activeId === 'spy-two'">Two</usli-list-group-item>
          <usli-list-group-item [active]="activeId === 'spy-three'">Three</usli-list-group-item>
        </usli-list-group>
        <div usliScrollspy [targets]="targets" [(activeId)]="activeId" style="height: 240px; overflow-y: auto; border: 1px solid var(--gray-300, #e0e0e0);">
          <div id="spy-one" style="${sectionStyle}">Section One</div>
          <div id="spy-two" style="${sectionStyle}">Section Two</div>
          <div id="spy-three" style="${sectionStyle}">Section Three</div>
        </div>
      </div>
    `,
  }),
};
