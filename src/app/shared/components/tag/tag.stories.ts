import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ArgTypes, Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { TagModule } from './tag.module';
import { TdxTagEmphasis, TdxTagVariant } from './tag.model';

type TagStoryTheme = 'light' | 'dark';
type TagStoryState = 'default' | 'hover' | 'press' | 'focus' | 'active';

@Component({
  selector: 'tdx-tag-story-host',
  standalone: false,
  template: `
    <section class="tdx-tag-story" [attr.data-theme]="theme">
      <tdx-tag
        [class]="'tdx-tag-story__tag--' + state"
        [label]="label"
        [variant]="variant"
        [emphasis]="tagEmphasis"
        [leadingIcon]="leadingIcon"
        [removable]="removable"
        [disabled]="disabled">
      </tdx-tag>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .tdx-tag-story {
        align-items: flex-start;
        background: var(--alias-surface-default);
        box-sizing: border-box;
        display: flex;
        min-height: 160px;
        padding: var(--space-6xl);
      }

      .tdx-tag-story__tag--hover {
        --tag-neutral-subtle-bg-default: var(--tag-neutral-subtle-bg-hover);
        --tag-primary-subtle-bg-default: var(--tag-primary-subtle-bg-hover);
        --tag-success-subtle-bg-default: var(--tag-success-subtle-bg-hover);
        --tag-warning-subtle-bg-default: var(--tag-warning-subtle-bg-hover);
        --tag-danger-subtle-bg-default: var(--tag-danger-subtle-bg-hover);
        --tag-info-subtle-bg-default: var(--tag-info-subtle-bg-hover);
      }

      .tdx-tag-story__tag--press {
        --tag-neutral-subtle-bg-default: var(--tag-neutral-subtle-bg-pressed);
        --tag-primary-subtle-bg-default: var(--tag-primary-subtle-bg-pressed);
        --tag-success-subtle-bg-default: var(--tag-success-subtle-bg-pressed);
        --tag-warning-subtle-bg-default: var(--tag-warning-subtle-bg-pressed);
        --tag-danger-subtle-bg-default: var(--tag-danger-subtle-bg-pressed);
        --tag-info-subtle-bg-default: var(--tag-info-subtle-bg-pressed);
      }

      .tdx-tag-story__tag--active {
        --tag-neutral-subtle-bg-default: var(--tag-neutral-active-bg);
        --tag-neutral-subtle-border-default: var(--tag-neutral-active-border);
        --tag-neutral-subtle-icon-default: var(--tag-neutral-active-icon);
        --tag-neutral-subtle-text-default: var(--tag-neutral-active-text);
      }

      .tdx-tag-story__tag--focus {
        display: inline-flex;
        position: relative;
      }

      .tdx-tag-story__tag--focus::after {
        border: var(--tag-focus-ring-width) solid var(--tag-focus-ring);
        border-radius: var(--tag-radius);
        content: '';
        inset: calc(var(--tag-focus-ring-offset) * -1);
        pointer-events: none;
        position: absolute;
      }

      @media (max-width: 767px) {
        .tdx-tag-story {
          padding: var(--space-3xl);
        }
      }
    `,
  ],
})
class TagStoryHostComponent {
  @Input() label = 'Tag';
  @Input() variant: TdxTagVariant = TdxTagVariant.Neutral;
  @Input() state: TagStoryState = 'default';
  @Input() leadingIcon?: string;
  @Input() removable = false;
  @Input() disabled = false;
  @Input() theme: TagStoryTheme = 'light';

  readonly tagEmphasis = TdxTagEmphasis.Subtle;
}

const sharedArgTypes: ArgTypes<TagStoryHostComponent> = {
  label: {
    control: 'text',
  },
  variant: {
    table: {
      disable: true,
    },
  },
  state: {
    control: 'select',
    options: ['default', 'hover', 'press', 'focus', 'active'],
  },
  leadingIcon: {
    control: 'text',
  },
  removable: {
    control: 'boolean',
  },
  disabled: {
    control: 'boolean',
  },
  theme: {
    control: 'inline-radio',
    options: ['light', 'dark'],
  },
  tagEmphasis: {
    table: {
      disable: true,
    },
  },
};

const meta: Meta<TagStoryHostComponent> = {
  title: 'Components/Tag',
  component: TagStoryHostComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, TagModule],
      declarations: [TagStoryHostComponent],
    }),
  ],
  argTypes: sharedArgTypes,
};

export default meta;

type Story = StoryObj<TagStoryHostComponent>;

const createColorStory = (
  variant: TdxTagVariant,
  supportsActive = false,
  supportsRemovable = false,
): Story => ({
  args: {
    label: 'Tag',
    variant,
    state: 'default',
    leadingIcon: 'info',
    removable: false,
    disabled: false,
    theme: 'light',
  },
  argTypes: {
    ...(supportsActive
      ? {}
      : {
          state: {
            ...sharedArgTypes.state,
            options: ['default', 'hover', 'press', 'focus'],
          },
        }),
    ...(supportsRemovable
      ? {}
      : {
          removable: {
            table: {
              disable: true,
            },
          },
        }),
  },
});

export const Default: Story = createColorStory(TdxTagVariant.Neutral, true, true);
export const Purple: Story = createColorStory(TdxTagVariant.Primary);
export const Green: Story = createColorStory(TdxTagVariant.Success);
export const Yellow: Story = createColorStory(TdxTagVariant.Warning);
export const Red: Story = createColorStory(TdxTagVariant.Danger);
export const Info: Story = createColorStory(TdxTagVariant.Info);
