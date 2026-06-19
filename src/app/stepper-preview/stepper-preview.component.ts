import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TdxButtonSize, TdxButtonVariant } from '../shared/components/button/button.model';
import { StepperOrientation, StepperStep } from '../shared/components/stepper/stepper.model';

@Component({
  selector: 'tdx-stepper-preview',
  standalone: false,
  templateUrl: './stepper-preview.component.html',
  styleUrls: ['./stepper-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperPreviewComponent {
  currentIndex = 0;

  readonly verticalSteps: StepperStep[] = [
    { label: 'Step Label' },
    { label: 'Step Label' },
    { label: 'Step Label', state: 'incomplete' },
    { label: 'Step Label', state: 'disabled' },
  ];

  readonly horizontalSteps: StepperStep[] = this.verticalSteps;

  readonly StepperOrientation: Record<StepperOrientation, StepperOrientation> = {
    horizontal: 'horizontal',
    vertical: 'vertical',
  };
  readonly TdxButtonSize = TdxButtonSize;
  readonly TdxButtonVariant = TdxButtonVariant;

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
    for (let index = startIndex; index >= 0 && index < this.verticalSteps.length; index += direction) {
      if (this.verticalSteps[index]?.state !== 'disabled') {
        return index;
      }
    }

    return null;
  }
}
