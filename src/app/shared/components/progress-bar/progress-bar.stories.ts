import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ProgressBarModule } from './progress-bar.module';
import { TDX_PROGRESS_BAR_VARIANTS, TdxProgressBarVariant } from './progress-bar.model';

type ProgressBarStoryTheme = 'light' | 'dark';

@Component({
  selector: 'tdx-progress-bar-story-host',
  standalone: false,
  template: `
    <section class="tdx-progress-bar-story" [attr.data-theme]="theme">
      <tdx-progress-bar [variant]="variant" [progress]="progress"></tdx-progress-bar>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .tdx-progress-bar-story {
        background: var(--alias-surface-default);
        box-sizing: border-box;
        min-height: var(--space-10xl);
        padding: var(--space-6xl);
      }

      @media (max-width: 767px) {
        .tdx-progress-bar-story {
          padding: var(--space-3xl);
        }
      }
    `,
  ],
})
class ProgressBarStoryHostComponent implements OnInit, OnDestroy {
  @Input() variant: TdxProgressBarVariant = 'brand';
  @Input() theme: ProgressBarStoryTheme = 'light';

  progress = 10;
  private progressTimer?: ReturnType<typeof setInterval>;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.progressTimer = setInterval(() => {
      this.progress = (this.progress + 1) % 101;
      this.changeDetectorRef.markForCheck();
    }, 80);
  }

  ngOnDestroy(): void {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
    }
  }
}

const meta: Meta<ProgressBarStoryHostComponent> = {
  title: 'Components/Progress Bar',
  component: ProgressBarStoryHostComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ProgressBarModule],
      declarations: [ProgressBarStoryHostComponent],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: TDX_PROGRESS_BAR_VARIANTS,
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
    },
  },
};

export default meta;

type Story = StoryObj<ProgressBarStoryHostComponent>;

export const Playground: Story = {
  args: {
    variant: 'brand',
    theme: 'light',
  },
};

const fixedVariantArgTypes = {
  variant: {
    table: {
      disable: true,
    },
  },
};

export const Brand: Story = {
  argTypes: fixedVariantArgTypes,
  args: {
    variant: 'brand',
    theme: 'light',
  },
};

export const Success: Story = {
  argTypes: fixedVariantArgTypes,
  args: {
    variant: 'success',
    theme: 'light',
  },
};

export const Processing: Story = {
  argTypes: fixedVariantArgTypes,
  args: {
    variant: 'processing',
    theme: 'light',
  },
};
