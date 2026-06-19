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

type ButtonStoryTheme = 'light' | 'dark';

@Component({
  selector: 'tdx-button-story-host',
  standalone: false,
  template: `
    <section class="tdx-button-story" [attr.data-theme]="theme">
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
    </section>
  `,
  styles: [
    `
      .tdx-button-story {
        align-items: flex-start;
        background: var(--alias-surface-default);
        color: var(--text-neutral-primary);
        display: flex;
        min-height: 160px;
        padding: var(--space-6xl);
      }

      @media (max-width: 767px) {
        .tdx-button-story {
          min-height: 120px;
          padding: var(--space-3xl);
        }
      }
    `,
  ],
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

  @Input() theme: ButtonStoryTheme = 'light';
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

    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
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
    theme: 'light',
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
    theme: 'light',
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
    theme: 'light',
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
    theme: 'light',
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
    theme: 'light',
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
    theme: 'light',
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
    theme: 'light',
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
    theme: 'light',
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
    theme: 'light',
  },
};
