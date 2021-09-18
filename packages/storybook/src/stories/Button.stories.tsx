import Button from '@remarkable/button/src/Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Example/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Children = Template.bind({});
Children.args = {
  children: 'Text',
};
