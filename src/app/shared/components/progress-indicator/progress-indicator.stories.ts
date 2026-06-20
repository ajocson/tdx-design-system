import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ButtonModule } from '../button/button.module';
import { TdxButtonSize, TdxButtonVariant } from '../button/button.model';
import { ProgressIndicatorModule } from './progress-indicator.module';
import { TDX_PROGRESS_INDICATOR_VALUE_TYPES, TdxProgressIndicatorValueType } from './progress-indicator.model';

type ProgressIndicatorStoryTheme = 'light' | 'dark';

@Component({
  selector: 'tdx-progress-indicator-story-host',
  standalone: false,
  template: `
    <section class="tdx-progress-indicator-story" [attr.data-theme]="theme">
      <tdx-progress-indicator
        [label]="resolvedLabel"
        [valueType]="valueType"
        [showFractionValue]="showFractionValue"
        [fractionValue]="resolvedFractionValue"
        [showPercentValue]="showPercentValue"
        [percentageValue]="resolvedPercentageValue"
        [progress]="resolvedProgress">
      </tdx-progress-indicator>

      <div *ngIf="valueType === 'fraction'" class="tdx-progress-indicator-story__controls" aria-label="Progress step controls">
        <tdx-button
          [label]="''"
          [variant]="TdxButtonVariant.Subtle"
          [size]="TdxButtonSize.Small"
          leftIcon="arrow_back"
          ariaLabel="Back"
          [disabled]="currentStep === 1"
          (clicked)="goBack()">
        </tdx-button>

        <tdx-button
          [label]="''"
          [variant]="TdxButtonVariant.Subtle"
          [size]="TdxButtonSize.Small"
          leftIcon="arrow_forward"
          ariaLabel="Next"
          [disabled]="currentStep === totalSteps"
          (clicked)="goNext()">
        </tdx-button>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .tdx-progress-indicator-story {
        background: var(--alias-surface-default);
        box-sizing: border-box;
        display: grid;
        gap: var(--space-4xl);
        min-height: 180px;
        padding: var(--space-6xl);
      }

      .tdx-progress-indicator-story__controls {
        display: flex;
        gap: var(--space-lg);
      }

      @media (max-width: 767px) {
        .tdx-progress-indicator-story {
          min-height: 140px;
          padding: var(--space-3xl);
        }
      }
    `,
  ],
})
class ProgressIndicatorStoryHostComponent implements OnInit, OnDestroy {
  readonly TdxButtonSize = TdxButtonSize;
  readonly TdxButtonVariant = TdxButtonVariant;
  readonly totalSteps = 10;

  private initialized = false;
  private percentageTimer?: ReturnType<typeof setInterval>;
  private _valueType: TdxProgressIndicatorValueType = 'fraction';

  @Input()
  set valueType(value: TdxProgressIndicatorValueType) {
    this._valueType = value;

    if (this.initialized) {
      this.syncPercentageAnimation();
    }
  }

  get valueType(): TdxProgressIndicatorValueType {
    return this._valueType;
  }

  @Input() label = 'Label';
  @Input() showFractionValue = true;
  @Input() showPercentValue = true;
  @Input() theme: ProgressIndicatorStoryTheme = 'light';

  currentStep = 1;
  percentageProgress = 0;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initialized = true;
    this.syncPercentageAnimation();
  }

  ngOnDestroy(): void {
    this.stopPercentageAnimation();
  }

  get resolvedFractionValue(): string {
    return `${this.currentStep}/${this.totalSteps}`;
  }

  get resolvedPercentageValue(): string {
    return `${this.percentageProgress}%`;
  }

  get resolvedProgress(): number {
    if (this.valueType === 'fraction') {
      return (this.currentStep / this.totalSteps) * 100;
    }

    return this.percentageProgress;
  }

  get resolvedLabel(): string {
    return this.valueType === 'percentage' && this.label === 'Label' ? 'Loading' : this.label;
  }

  goBack(): void {
    this.currentStep = Math.max(1, this.currentStep - 1);
  }

  goNext(): void {
    this.currentStep = Math.min(this.totalSteps, this.currentStep + 1);
  }

  private syncPercentageAnimation(): void {
    this.stopPercentageAnimation();

    if (this.valueType !== 'percentage') {
      return;
    }

    this.percentageTimer = setInterval(() => {
      this.percentageProgress = (this.percentageProgress + 1) % 101;
      this.changeDetectorRef.markForCheck();
    }, 80);
  }

  private stopPercentageAnimation(): void {
    if (this.percentageTimer) {
      clearInterval(this.percentageTimer);
      this.percentageTimer = undefined;
    }
  }
}

const meta: Meta<ProgressIndicatorStoryHostComponent> = {
  title: 'Components/Progress Indicator',
  component: ProgressIndicatorStoryHostComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonModule, CommonModule, ProgressIndicatorModule],
      declarations: [ProgressIndicatorStoryHostComponent],
    }),
  ],
  argTypes: {
    valueType: {
      control: 'select',
      options: TDX_PROGRESS_INDICATOR_VALUE_TYPES,
    },
    label: {
      control: 'text',
    },
    showFractionValue: {
      control: 'boolean',
      if: { arg: 'valueType', eq: 'fraction' },
    },
    showPercentValue: {
      control: 'boolean',
      if: { arg: 'valueType', eq: 'percentage' },
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
    },
  },
};

export default meta;

type Story = StoryObj<ProgressIndicatorStoryHostComponent>;

const fixedValueTypeArgTypes = {
  valueType: {
    table: {
      disable: true,
    },
  },
};

export const Playground: Story = {
  args: {
    valueType: 'fraction',
    label: 'Label',
    showFractionValue: true,
    showPercentValue: true,
    theme: 'light',
  },
};

export const Fraction: Story = {
  argTypes: fixedValueTypeArgTypes,
  args: {
    valueType: 'fraction',
    label: 'Label',
    showFractionValue: true,
    showPercentValue: true,
    theme: 'light',
  },
};

export const Percentage: Story = {
  argTypes: fixedValueTypeArgTypes,
  args: {
    valueType: 'percentage',
    label: 'Loading',
    showFractionValue: true,
    showPercentValue: true,
    theme: 'light',
  },
};
