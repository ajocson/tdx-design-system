import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Controls,
  Description,
  Markdown,
  Primary as PrimaryDocs,
  Title,
} from '@storybook/addon-docs/blocks';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { createElement, Fragment } from 'react';

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
type ButtonStoryState = 'default' | 'hover' | 'pressed' | 'focus';

const BUTTON_DOCUMENTATION = `## Variants

- Primary
- Secondary
- Success
- Danger
- Warning
- Discovery
- Subtle

## Emphasis

- Default
- Outline
- Transparent

## Sizes

- Small
- Medium
- Large

## Design Tokens

### Background

- \`--button-primary-filled-bg-default\`
- \`--button-primary-filled-bg-hover\`
- \`--button-primary-filled-bg-pressed\`

### Text

- \`--button-primary-filled-text\`

### Icon

- \`--button-primary-filled-icon\`

### Radius

- \`--radius-round\`

### Focus

- \`--button-primary-focus-ring\`

### Spacing

- \`--button-padding-x-sm\`
- \`--button-padding-y-sm\`
- \`--button-padding-x-md\`
- \`--button-padding-y-md\`
- \`--button-padding-x-lg\`
- \`--button-padding-y-lg\`

### Typography

- \`--typography-font-family-paragraph\`
- \`--paragraph-sm-text-size\`
- \`--paragraph-md-text-size\`
- \`--paragraph-lg-text-size\`

## Accessibility

- Renders a native \`button\` for keyboard and assistive-technology support.
- Forwards accessible labels to the native button element.
- Preserves visible keyboard focus and communicates disabled and loading states through native button semantics.
`;

const ButtonDocsPage = () =>
  createElement(
    Fragment,
    null,
    createElement(Title),
    createElement('h2', null, 'Component Overview'),
    createElement(Description),
    createElement(PrimaryDocs),
    createElement('h2', null, 'Controls / Args Table'),
    createElement(Controls),
    createElement(Markdown, { children: BUTTON_DOCUMENTATION }),
  );

@Component({
  selector: 'tdx-button-story-host',
  standalone: false,
  template: `
    <section class="tdx-button-story" [attr.data-theme]="theme">
      <tdx-button
        [class.tdx-button-story__button--focus]="state === 'focus'"
        [ngStyle]="stateStyles"
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

      .tdx-button-story__button--focus {
        border-radius: var(--radius-round);
        box-shadow: 0 0 0 var(--border-width-xs-2) var(--button-focus-ring);
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

  @Input() state: ButtonStoryState = 'default';

  get stateStyles(): Record<string, string> {
    const emphasis =
      this.variant === TdxButtonVariant.Subtle ? TdxButtonEmphasis.DEFAULT : this.emphasis;
    const tokenEmphasis = emphasis === TdxButtonEmphasis.DEFAULT ? 'filled' : emphasis;
    const prefix = `--button-${this.variant}-${tokenEmphasis}`;
    const styles: Record<string, string> = {
      '--button-focus-ring':
        this.variant === TdxButtonVariant.Primary
          ? 'var(--button-primary-focus-ring)'
          : 'var(--button-secondary-focus-ring)',
    };

    if (this.state === 'default' || this.state === 'focus') {
      return styles;
    }

    const tokenState = this.state === 'hover' ? 'hover' : 'pressed';

    if (emphasis === TdxButtonEmphasis.TRANSPARENT) {
      styles[`${prefix}-text-default`] = `var(${prefix}-text-${tokenState})`;
      styles[`${prefix}-icon-default`] = `var(${prefix}-icon-${tokenState})`;
      return styles;
    }

    styles[`${prefix}-bg-default`] = `var(${prefix}-bg-${tokenState})`;

    if (this.variant === TdxButtonVariant.Warning && tokenState === 'hover') {
      styles[`${prefix}-text`] = `var(${prefix}-text-hover)`;
      styles[`${prefix}-icon`] = `var(${prefix}-icon-hover)`;
    }

    return styles;
  }
}

const meta: Meta<ButtonStoryHostComponent> = {
  title: 'Components/Button',
  component: ButtonStoryHostComponent,
  tags: ['autodocs'],

  parameters: {
    docs: {
      page: ButtonDocsPage,
      description: {
        component:
          'The Button component triggers actions and allows users to interact with the system. It supports multiple variants, emphasis styles, sizes, loading states, and disabled states.',
      },
      source: {
        type: 'dynamic',
      },
    },
  },

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

    state: {
      control: 'select',
      options: ['default', 'hover', 'pressed', 'focus'],
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

const fixedVariantArgTypes = {
  variant: {
    table: {
      disable: true,
    },
  },
};

export const Playground: Story = {
  args: {
    label: 'Button',
    variant: TdxButtonVariant.Primary,
    emphasis: TdxButtonEmphasis.DEFAULT,
    state: 'default',
    size: TdxButtonSize.Medium,
    disabled: false,
    loading: false,
    leftIcon: 'add',
    rightIcon: '',
    theme: 'light',
  },
};

export const Primary: Story = {
  argTypes: fixedVariantArgTypes,
  args: {
    label: 'Primary Button',
    variant: TdxButtonVariant.Primary,
    emphasis: TdxButtonEmphasis.DEFAULT,
    state: 'default',
    size: TdxButtonSize.Medium,
    disabled: false,
    loading: false,
    leftIcon: '',
    rightIcon: '',
    theme: 'light',
  },
};

export const Secondary: Story = {
  argTypes: fixedVariantArgTypes,
  args: {
    label: 'Secondary Button',
    variant: TdxButtonVariant.Secondary,
    emphasis: TdxButtonEmphasis.DEFAULT,
    state: 'default',
    size: TdxButtonSize.Medium,
    disabled: false,
    loading: false,
    leftIcon: '',
    rightIcon: '',
    theme: 'light',
  },
};

export const Success: Story = {
  argTypes: fixedVariantArgTypes,
  args: {
    label: 'Success Button',
    variant: TdxButtonVariant.Success,
    emphasis: TdxButtonEmphasis.DEFAULT,
    state: 'default',
    size: TdxButtonSize.Medium,
    disabled: false,
    loading: false,
    leftIcon: '',
    rightIcon: '',
    theme: 'light',
  },
};

export const Danger: Story = {
  argTypes: fixedVariantArgTypes,
  args: {
    label: 'Danger Button',
    variant: TdxButtonVariant.Danger,
    emphasis: TdxButtonEmphasis.DEFAULT,
    state: 'default',
    size: TdxButtonSize.Medium,
    disabled: false,
    loading: false,
    leftIcon: '',
    rightIcon: '',
    theme: 'light',
  },
};

export const Warning: Story = {
  argTypes: fixedVariantArgTypes,
  args: {
    label: 'Warning Button',
    variant: TdxButtonVariant.Warning,
    emphasis: TdxButtonEmphasis.DEFAULT,
    state: 'default',
    size: TdxButtonSize.Medium,
    disabled: false,
    loading: false,
    leftIcon: '',
    rightIcon: '',
    theme: 'light',
  },
};

export const Discovery: Story = {
  argTypes: fixedVariantArgTypes,
  args: {
    label: 'Discovery Button',
    variant: TdxButtonVariant.Discovery,
    emphasis: TdxButtonEmphasis.DEFAULT,
    state: 'default',
    size: TdxButtonSize.Medium,
    disabled: false,
    loading: false,
    leftIcon: '',
    rightIcon: '',
    theme: 'light',
  },
};

export const Subtle: Story = {
  argTypes: fixedVariantArgTypes,
  args: {
    label: 'Subtle Button',
    variant: TdxButtonVariant.Subtle,
    emphasis: TdxButtonEmphasis.DEFAULT,
    state: 'default',
    size: TdxButtonSize.Medium,
    disabled: false,
    loading: false,
    leftIcon: '',
    rightIcon: '',
    theme: 'light',
  },
};

export const Loading: Story = {
  argTypes: fixedVariantArgTypes,
  args: {
    label: 'Processing',
    variant: TdxButtonVariant.Primary,
    emphasis: TdxButtonEmphasis.DEFAULT,
    state: 'default',
    size: TdxButtonSize.Medium,
    disabled: false,
    loading: true,
    leftIcon: '',
    rightIcon: '',
    theme: 'light',
  },
};

export const Disabled: Story = {
  argTypes: fixedVariantArgTypes,
  args: {
    label: 'Disabled Button',
    variant: TdxButtonVariant.Primary,
    emphasis: TdxButtonEmphasis.DEFAULT,
    state: 'default',
    size: TdxButtonSize.Medium,
    disabled: true,
    loading: false,
    leftIcon: '',
    rightIcon: '',
    theme: 'light',
  },
};
