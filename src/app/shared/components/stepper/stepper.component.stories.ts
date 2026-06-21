import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { ButtonModule } from '../button/button.module';
import { TdxButtonSize, TdxButtonVariant } from '../button/button.model';
import { StepperModule } from './stepper.module';
import { STEPPER_ORIENTATIONS, StepperOrientation, StepperStep, StepperVisualState } from './stepper.model';

const DEFAULT_STEPS: StepperStep[] = [
  { label: 'Step Label', state: 'current' },
  { label: 'Step Label', state: 'upcoming' },
  { label: 'Step Label', state: 'incomplete' },
  { label: 'Step Label', state: 'disabled' },
];

type StepperStoryTheme = 'light' | 'dark';

@Component({
  selector: 'tdx-stepper-story-host',
  standalone: false,
  template: `
    <section class="tdx-stepper-story" [attr.data-theme]="theme">
      <tdx-stepper
        [steps]="steps"
        [orientation]="orientation"
        [currentIndex]="currentIndex">
      </tdx-stepper>

      <div class="tdx-stepper-story__controls" aria-label="Stepper preview controls">
        <app-button
          [label]="''"
          [variant]="TdxButtonVariant.Subtle"
          [size]="TdxButtonSize.Small"
          leftIcon="arrow_back"
          ariaLabel="Back"
          [disabled]="!canGoBack"
          (clicked)="goBack()">
        </app-button>

        <app-button
          [label]="''"
          [variant]="TdxButtonVariant.Subtle"
          [size]="TdxButtonSize.Small"
          leftIcon="arrow_forward"
          ariaLabel="Next"
          [disabled]="!canGoNext"
          (clicked)="goNext()">
        </app-button>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .tdx-stepper-story {
        align-items: flex-start;
        background: var(--alias-surface-default);
        box-sizing: border-box;
        display: grid;
        gap: var(--space-5xl);
        min-height: 240px;
        padding: var(--space-6xl);
      }

      .tdx-stepper-story__controls {
        align-items: center;
        display: flex;
        gap: var(--space-lg);
      }

      @media (max-width: 760px) {
        .tdx-stepper-story {
          min-height: 180px;
          padding: var(--space-3xl);
        }
      }
    `,
  ],
})
class StepperStoryHostComponent {
  readonly TdxButtonSize = TdxButtonSize;
  readonly TdxButtonVariant = TdxButtonVariant;

  @Input() steps: StepperStep[] = DEFAULT_STEPS;
  @Input() orientation: StepperOrientation = 'vertical';
  @Input() theme: StepperStoryTheme = 'light';

  get currentIndex(): number {
    const configuredCurrentIndex = this.steps.findIndex((step) => step.state === 'current');
    return configuredCurrentIndex === -1 ? 0 : configuredCurrentIndex;
  }

  get canGoBack(): boolean {
    return this.canMoveTo(this.currentIndex - 1);
  }

  get canGoNext(): boolean {
    return this.canMoveTo(this.currentIndex + 1);
  }

  goBack(): void {
    this.moveTo(this.currentIndex - 1, 'upcoming');
  }

  goNext(): void {
    this.moveTo(this.currentIndex + 1, 'completed');
  }

  private canMoveTo(index: number): boolean {
    const destination = this.steps[index];
    return Boolean(destination && destination.state !== 'disabled' && destination.state !== 'incomplete');
  }

  private moveTo(index: number, previousState: Extract<StepperVisualState, 'completed' | 'upcoming'>): void {
    if (!this.canMoveTo(index)) {
      return;
    }

    const activeIndex = this.currentIndex;

    this.steps = this.steps.map((step, stepIndex) => {
      if (stepIndex === activeIndex) {
        return { ...step, state: previousState };
      }

      if (stepIndex === index) {
        return { ...step, state: 'current' };
      }

      return step;
    });
  }
}

const meta: Meta<StepperStoryHostComponent> = {
  title: 'Components/Stepper',
  component: StepperStoryHostComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonModule, CommonModule, StepperModule],
      declarations: [StepperStoryHostComponent],
    }),
  ],
  argTypes: {
    steps: {
      control: 'object',
      description: 'Each step requires a label and may use completed, current, upcoming, incomplete, or disabled state.',
    },
    orientation: {
      control: 'select',
      options: STEPPER_ORIENTATIONS,
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
    },
  },
};

export default meta;

type Story = StoryObj<StepperStoryHostComponent>;

const fixedOrientationArgTypes = {
  orientation: {
    table: {
      disable: true,
    },
  },
};

export const Playground: Story = {
  args: {
    steps: DEFAULT_STEPS,
    orientation: 'vertical',
    theme: 'light',
  },
};

export const VerticalStepper: Story = {
  argTypes: fixedOrientationArgTypes,
  args: {
    steps: DEFAULT_STEPS,
    orientation: 'vertical',
    theme: 'light',
  },
};

export const HorizontalStepper: Story = {
  argTypes: fixedOrientationArgTypes,
  args: {
    steps: DEFAULT_STEPS,
    orientation: 'horizontal',
    theme: 'light',
  },
};
