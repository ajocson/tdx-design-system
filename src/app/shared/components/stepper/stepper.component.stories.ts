import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { ButtonModule } from '../button/button.module';
import { TdxButtonSize, TdxButtonVariant } from '../button/button.model';
import { StepperModule } from './stepper.module';
import { STEPPER_ORIENTATIONS, StepperOrientation, StepperStep } from './stepper.model';

const DEFAULT_STEPS: StepperStep[] = [
  { label: 'Step Label' },
  { label: 'Step Label' },
  { label: 'Step Label', state: 'incomplete' },
  { label: 'Step Label', state: 'disabled' },
];

const DEFAULT_STEP_LABELS = DEFAULT_STEPS.map((step) => step.label).join('\n');

type StepperStoryTheme = 'light' | 'dark';

@Component({
  selector: 'tdx-stepper-story-host',
  standalone: false,
  template: `
    <ng-container *ngIf="previewLayout; else singleStepper">
      <main class="tdx-stepper-story">
        <section class="tdx-stepper-story__theme tdx-theme-light" data-theme="light">
          <header class="tdx-stepper-story__header">
            <h1>Stepper Playground</h1>
            <p>Light mode</p>
          </header>

          <div class="tdx-stepper-story__examples">
            <section class="tdx-stepper-story__section">
              <h2>Vertical stepper</h2>
              <tdx-stepper
                [steps]="resolvedSteps"
                orientation="vertical"
                [currentIndex]="currentIndex"
                [clickableSteps]="clickableSteps"
                (currentIndexChange)="currentIndex = $event">
              </tdx-stepper>
            </section>

            <section class="tdx-stepper-story__section tdx-stepper-story__horizontal">
              <h2>Horizontal stepper</h2>
              <tdx-stepper
                [steps]="resolvedSteps"
                orientation="horizontal"
                [currentIndex]="currentIndex"
                [showLeftConnector]="showLeftConnector"
                [showRightConnector]="showRightConnector"
                [clickableSteps]="clickableSteps"
                (currentIndexChange)="currentIndex = $event">
              </tdx-stepper>
            </section>
          </div>
        </section>

        <section class="tdx-stepper-story__theme tdx-stepper-story__theme--dark tdx-theme-dark" data-theme="dark">
          <header class="tdx-stepper-story__header">
            <h1>Stepper Playground</h1>
            <p>Dark mode</p>
          </header>

          <div class="tdx-stepper-story__examples">
            <section class="tdx-stepper-story__section">
              <h2>Vertical stepper</h2>
              <tdx-stepper
                [steps]="resolvedSteps"
                orientation="vertical"
                [currentIndex]="currentIndex"
                [clickableSteps]="clickableSteps"
                (currentIndexChange)="currentIndex = $event">
              </tdx-stepper>
            </section>

            <section class="tdx-stepper-story__section tdx-stepper-story__horizontal">
              <h2>Horizontal stepper</h2>
              <tdx-stepper
                [steps]="resolvedSteps"
                orientation="horizontal"
                [currentIndex]="currentIndex"
                [showLeftConnector]="showLeftConnector"
                [showRightConnector]="showRightConnector"
                [clickableSteps]="clickableSteps"
                (currentIndexChange)="currentIndex = $event">
              </tdx-stepper>
            </section>
          </div>
        </section>
      </main>
    </ng-container>

    <ng-template #singleStepper>
      <section class="tdx-stepper-story__theme" [attr.data-theme]="theme">
        <tdx-stepper
          [steps]="resolvedSteps"
          [orientation]="orientation"
          [currentIndex]="currentIndex"
          [showLeftConnector]="showLeftConnector"
          [showRightConnector]="showRightConnector"
          [backLabel]="backLabel"
          [nextLabel]="nextLabel"
          [showPreviewControls]="showPreviewControls"
          [clickableSteps]="clickableSteps"
          (currentIndexChange)="currentIndex = $event">
        </tdx-stepper>

        <div class="tdx-stepper-story__controls" aria-label="Stepper preview controls">
          <app-button
            [label]="''"
            [variant]="TdxButtonVariant.Subtle"
            [size]="TdxButtonSize.Small"
            leftIcon="arrow_back"
            [ariaLabel]="'Back'"
            [disabled]="!canGoBack"
            (clicked)="goBack()">
          </app-button>

          <app-button
            [label]="''"
            [variant]="TdxButtonVariant.Subtle"
            [size]="TdxButtonSize.Small"
            leftIcon="arrow_forward"
            [ariaLabel]="'Next'"
            [disabled]="!canGoNext"
            (clicked)="goNext()">
          </app-button>
        </div>
      </section>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .tdx-stepper-story {
        background: var(--surface-page);
        color: var(--text-neutral-primary);
        display: grid;
        font-family: var(--typography-font-family-paragraph);
        gap: var(--space-7xl);
        padding: var(--space-7xl);
      }

      .tdx-stepper-story__theme {
        background: var(--alias-surface-default);
        border: var(--border-width-xs-1) solid var(--border-neutral-default-secondary);
        border-radius: var(--radius-lg);
        color: var(--text-neutral-primary);
        display: grid;
        gap: var(--space-5xl);
        padding: var(--space-6xl);
      }

      .tdx-stepper-story__header,
      .tdx-stepper-story__section {
        display: grid;
        gap: var(--space-md);
      }

      .tdx-stepper-story__header h1,
      .tdx-stepper-story__header p,
      .tdx-stepper-story__section h2 {
        margin: 0;
      }

      .tdx-stepper-story__header h1,
      .tdx-stepper-story__section h2 {
        font-family: var(--typography-font-family-heading);
        font-size: var(--h6-text-size);
        line-height: var(--h6-line-height);
      }

      .tdx-stepper-story__header h1 {
        color: var(--icon-brand-default);
      }

      .tdx-stepper-story__header p {
        color: var(--text-neutral-secondary);
        font-size: var(--paragraph-md-text-size);
        line-height: var(--paragraph-md-line-height);
      }

      .tdx-stepper-story__section {
        gap: var(--space-3xl);
      }

      .tdx-stepper-story__examples {
        align-items: start;
        column-gap: var(--space-8xl);
        display: grid;
        grid-template-columns: max-content max-content;
        row-gap: var(--space-5xl);
      }

      .tdx-stepper-story__horizontal {
        max-width: 100%;
        width: var(--stepper-horizontal-preview-width);
      }

      .tdx-stepper-story__controls {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-lg);
      }

      @media (max-width: 900px) {
        .tdx-stepper-story__examples {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 760px) {
        .tdx-stepper-story {
          gap: var(--space-4xl);
          padding: var(--space-3xl);
        }

        .tdx-stepper-story__theme {
          padding: var(--space-3xl);
        }

        .tdx-stepper-story__horizontal {
          overflow-x: auto;
        }
      }
    `,
  ],
})
class StepperStoryHostComponent {
  readonly TdxButtonSize = TdxButtonSize;
  readonly TdxButtonVariant = TdxButtonVariant;

  @Input() steps: StepperStep[] = DEFAULT_STEPS;
  @Input() stepLabels = DEFAULT_STEP_LABELS;
  @Input() orientation: StepperOrientation = 'vertical';
  @Input() currentIndex = 0;
  @Input() showLeftConnector = true;
  @Input() showRightConnector = true;
  @Input() backLabel = 'Back';
  @Input() nextLabel = 'Next';
  @Input() showPreviewControls = false;
  @Input() clickableSteps = false;
  @Input() previewLayout = false;
  @Input() theme: StepperStoryTheme = 'light';

  get resolvedSteps(): StepperStep[] {
    const labels = this.stepLabels
      .split(/\n|,/)
      .map((label) => label.trim())
      .filter(Boolean);

    if (labels.length === 0) {
      return this.steps;
    }

    return labels.map((label, index) => ({
      ...this.steps[index],
      label,
    }));
  }

  get canGoBack(): boolean {
    return this.findEnabledStepIndex(this.currentIndex - 1, -1) !== null;
  }

  get canGoNext(): boolean {
    return this.findEnabledStepIndex(this.currentIndex + 1, 1) !== null;
  }

  goBack(): void {
    const previousIndex = this.findEnabledStepIndex(this.currentIndex - 1, -1);

    if (previousIndex !== null) {
      this.currentIndex = previousIndex;
    }
  }

  goNext(): void {
    const nextIndex = this.findEnabledStepIndex(this.currentIndex + 1, 1);

    if (nextIndex !== null) {
      this.currentIndex = nextIndex;
    }
  }

  private findEnabledStepIndex(startIndex: number, direction: 1 | -1): number | null {
    for (let index = startIndex; index >= 0 && index < this.resolvedSteps.length; index += direction) {
      if (this.resolvedSteps[index]?.state !== 'disabled') {
        return index;
      }
    }

    return null;
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
      table: {
        disable: true,
      },
    },
    stepLabels: {
      control: 'text',
      description: 'Use commas or new lines to add step labels.',
    },
    orientation: {
      control: 'select',
      options: STEPPER_ORIENTATIONS,
    },
    currentIndex: {
      table: {
        disable: true,
      },
    },
    showLeftConnector: {
      table: {
        disable: true,
      },
    },
    showRightConnector: {
      table: {
        disable: true,
      },
    },
    backLabel: {
      table: {
        disable: true,
      },
    },
    nextLabel: {
      table: {
        disable: true,
      },
    },
    showPreviewControls: {
      table: {
        disable: true,
      },
    },
    clickableSteps: {
      table: {
        disable: true,
      },
    },
    previewLayout: {
      table: {
        disable: true,
      },
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
    },
  },
};

export default meta;

type Story = StoryObj<StepperStoryHostComponent>;

export const Playground: Story = {
  args: {
    steps: DEFAULT_STEPS,
    stepLabels: DEFAULT_STEP_LABELS,
    orientation: 'vertical',
    currentIndex: 0,
    showLeftConnector: true,
    showRightConnector: true,
    backLabel: 'Back',
    nextLabel: 'Next',
    showPreviewControls: false,
    clickableSteps: false,
    previewLayout: false,
    theme: 'light',
  },
};

export const VerticalStepper: Story = {
  args: {
    steps: DEFAULT_STEPS,
    stepLabels: DEFAULT_STEP_LABELS,
    orientation: 'vertical',
    currentIndex: 0,
    theme: 'light',
  },
};

export const HorizontalStepper: Story = {
  args: {
    steps: DEFAULT_STEPS,
    stepLabels: DEFAULT_STEP_LABELS,
    orientation: 'horizontal',
    currentIndex: 0,
    theme: 'light',
  },
};
