import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { ButtonModule } from './button.module';

import {
  TDX_BUTTON_EMPHASIS,
  TDX_BUTTON_SIZES,
  TDX_BUTTON_VARIANTS,
  TdxButtonEmphasis,
  TdxButtonSize,
  TdxButtonVariant,
} from './button.model';

@Component({
  selector: 'tdx-button-story-host',
  standalone: false,
  template: `
    <tdx-button
      [label]="label"
      [variant]="variant"
      [emphasis]="emphasis"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [leftIcon]="leftIcon"
      [rightIcon]="rightIcon">
    </tdx-button>
  `,
})
class ButtonStoryHostComponent {
  @Input() label = 'Button';

  @Input()
  variant: TdxButtonVariant = TdxButtonVariant.Primary;

  @Input()
  emphasis: TdxButtonEmphasis = TdxButtonEmphasis.DEFAULT;

  @Input()
  size: TdxButtonSize = TdxButtonSize.Medium;

  @Input() disabled = false;

  @Input() loading = false;

  @Input() leftIcon?: string;

  @Input() rightIcon?: string;
}

const meta: Meta<ButtonStoryHostComponent> = {
  title: 'Components/Button',
  component: ButtonStoryHostComponent,

  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonModule],
      declarations: [ButtonStoryHostComponent],
    }),
  ],

  argTypes: {
    label: {
      control: 'text',
    },

    variant: {
      control: 'select',
      options: TDX_BUTTON_VARIANTS,
    },

    emphasis: {
      control: 'select',
      options: TDX_BUTTON_EMPHASIS,
    },

    size: {
      control: 'select',
      options: TDX_BUTTON_SIZES,
    },

    disabled: {
      control: 'boolean',
    },

    loading: {
      control: 'boolean',
    },

    leftIcon: {
      control: 'text',
    },

    rightIcon: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<ButtonStoryHostComponent>;

export const Playground: Story = {
  args: {
    label: 'Button',
    variant: TdxButtonVariant.Primary,
    emphasis: TdxButtonEmphasis.DEFAULT,
    size: TdxButtonSize.Medium,
    disabled: false,
    loading: false,
    leftIcon: 'add',
    rightIcon: '',
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: TdxButtonVariant.Primary,
    emphasis: TdxButtonEmphasis.DEFAULT,
    size: TdxButtonSize.Medium,
    disabled: false,
    loading: false,
    leftIcon: '',
    rightIcon: '',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: TdxButtonVariant.Secondary,
    emphasis: TdxButtonEmphasis.DEFAULT,
    size: TdxButtonSize.Medium,
    disabled: false,
    loading: false,
    leftIcon: '',
    rightIcon: '',
  },
};

export const Success: Story = {
  args: {
    label: 'Success Button',
    variant: TdxButtonVariant.Success,
    emphasis: TdxButtonEmphasis.DEFAULT,
    size: TdxButtonSize.Medium,
    disabled: false,
    loading: false,
    leftIcon: '',
    rightIcon: '',
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger Button',
    variant: TdxButtonVariant.Danger,
    emphasis: TdxButtonEmphasis.DEFAULT,
    size: TdxButtonSize.Medium,
    disabled: false,
    loading: false,
    leftIcon: '',
    rightIcon: '',
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning Button',
    variant: TdxButtonVariant.Warning,
    emphasis: TdxButtonEmphasis.DEFAULT,
    size: TdxButtonSize.Medium,
    disabled: false,
    loading: false,
    leftIcon: '',
    rightIcon: '',
  },
};

export const Discovery: Story = {
  args: {
    label: 'Discovery Button',
    variant: TdxButtonVariant.Discovery,
    emphasis: TdxButtonEmphasis.DEFAULT,
    size: TdxButtonSize.Medium,
    disabled: false,
    loading: false,
    leftIcon: '',
    rightIcon: '',
  },
};

export const Subtle: Story = {
  args: {
    label: 'Subtle Button',
    variant: TdxButtonVariant.Subtle,
    emphasis: TdxButtonEmphasis.DEFAULT,
    size: TdxButtonSize.Medium,
    disabled: false,
    loading: false,
    leftIcon: '',
    rightIcon: '',
  },
};

export const Loading: Story = {
  args: {
    label: 'Processing',
    variant: TdxButtonVariant.Primary,
    emphasis: TdxButtonEmphasis.DEFAULT,
    size: TdxButtonSize.Medium,
    disabled: false,
    loading: true,
    leftIcon: '',
    rightIcon: '',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    variant: TdxButtonVariant.Primary,
    emphasis: TdxButtonEmphasis.DEFAULT,
    size: TdxButtonSize.Medium,
    disabled: true,
    loading: false,
    leftIcon: '',
    rightIcon: '',
  },
};