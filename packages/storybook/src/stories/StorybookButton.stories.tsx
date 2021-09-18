import { ComponentMeta, ComponentStory } from '@storybook/react';

import StorybookButton from './StorybookButton';

export default {
  title: 'Example/StorybookButton',
  component: StorybookButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof StorybookButton>;

const Template: ComponentStory<typeof StorybookButton> = (args) => (
  <StorybookButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'StorybookButton',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'StorybookButton',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'StorybookButton',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'StorybookButton',
};
