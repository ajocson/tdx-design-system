import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TdxButtonSize, TdxButtonVariant } from '../button/button.model';
import { StepperOrientation, StepperStep, StepperVisualState } from './stepper.model';

@Component({
  selector: 'tdx-stepper, app-stepper',
  standalone: false,
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  private _currentIndex = 0;

  readonly TdxButtonSize = TdxButtonSize;
  readonly TdxButtonVariant = TdxButtonVariant;

  @Input() steps: StepperStep[] = [];
  @Input() orientation: StepperOrientation = 'vertical';
  @Input() showLeftConnector = true;
  @Input() showRightConnector = true;
  @Input() backLabel = 'Back';
  @Input() nextLabel = 'Next';
  @Input() showPreviewControls = false;
  @Input() clickableSteps = false;

  @Output() currentIndexChange = new EventEmitter<number>();
  @Output() stepChange = new EventEmitter<StepperStep>();

  @Input()
  set currentIndex(value: number) {
    this._currentIndex = Number.isFinite(value) ? Math.trunc(value) : 0;
  }

  get currentIndex(): number {
    return this.resolvedCurrentIndex;
  }

  get minimumStepsMet(): boolean {
    return this.steps.length >= 2;
  }

  get resolvedCurrentIndex(): number {
    if (this.steps.length === 0) {
      return 0;
    }

    return Math.min(Math.max(this._currentIndex, 0), this.steps.length - 1);
  }

  get canGoBack(): boolean {
    return this.findEnabledStepIndex(this.resolvedCurrentIndex - 1, -1) !== null;
  }

  get canGoNext(): boolean {
    return this.findEnabledStepIndex(this.resolvedCurrentIndex + 1, 1) !== null;
  }

  get hostClasses(): Record<string, boolean> {
    return {
      [`tdx-stepper--${this.orientation}`]: true,
      'tdx-stepper--clickable': this.clickableSteps,
      'tdx-stepper--hide-left-connector': !this.showLeftConnector,
      'tdx-stepper--hide-right-connector': !this.showRightConnector,
    };
  }

  getStepNumber(step: StepperStep, index: number): number | string {
    return step.number ?? index + 1;
  }

  getStepVisualState(step: StepperStep, index: number): StepperVisualState {
    if (step.state === 'disabled') {
      return 'disabled';
    }

    if (step.state === 'incomplete') {
      return 'incomplete';
    }

    if (index < this.resolvedCurrentIndex) {
      return 'completed';
    }

    if (index === this.resolvedCurrentIndex) {
      return 'current';
    }

    return 'upcoming';
  }

  getStepClasses(step: StepperStep, index: number): Record<string, boolean> {
    const visualState = this.getStepVisualState(step, index);

    return {
      [`tdx-stepper__item--${visualState}`]: true,
      'tdx-stepper__item--clickable': this.isStepClickable(step),
    };
  }

  getIndicatorIcon(step: StepperStep, index: number): string | null {
    const visualState = this.getStepVisualState(step, index);

    if (visualState === 'completed') {
      return 'check';
    }

    if (visualState === 'incomplete') {
      return 'warning';
    }

    if (visualState === 'current' || visualState === 'upcoming' || visualState === 'disabled') {
      return 'circle';
    }

    return null;
  }

  shouldShowStepNumber(step: StepperStep, index: number): boolean {
    const visualState = this.getStepVisualState(step, index);
    return visualState === 'current' || visualState === 'upcoming' || visualState === 'disabled';
  }

  isStepDisabled(step: StepperStep): boolean {
    return step.state === 'disabled';
  }

  isStepClickable(step: StepperStep): boolean {
    return this.clickableSteps && !this.isStepDisabled(step);
  }

  getAriaCurrent(step: StepperStep, index: number): 'step' | null {
    return this.getStepVisualState(step, index) === 'current' ? 'step' : null;
  }

  getStepAriaLabel(step: StepperStep, index: number): string {
    const visualState = this.getStepVisualState(step, index);
    return `${step.label}, step ${this.getStepNumber(step, index)}, ${visualState}`;
  }

  onStepClick(step: StepperStep, index: number): void {
    if (!this.isStepClickable(step)) {
      return;
    }

    this.setCurrentIndex(index);
  }

  onStepKeydown(event: KeyboardEvent, index: number): void {
    if (!this.clickableSteps) {
      return;
    }

    const targetIndex = this.getKeyboardTargetIndex(event.key, index);

    if (targetIndex === null) {
      return;
    }

    event.preventDefault();
    this.focusStep(targetIndex);
  }

  goBack(): void {
    const previousIndex = this.findEnabledStepIndex(this.resolvedCurrentIndex - 1, -1);

    if (previousIndex !== null) {
      this.setCurrentIndex(previousIndex);
    }
  }

  goNext(): void {
    const nextIndex = this.findEnabledStepIndex(this.resolvedCurrentIndex + 1, 1);

    if (nextIndex !== null) {
      this.setCurrentIndex(nextIndex);
    }
  }

  private setCurrentIndex(index: number): void {
    const nextIndex = Math.min(Math.max(index, 0), this.steps.length - 1);
    const nextStep = this.steps[nextIndex];

    if (!nextStep || this.isStepDisabled(nextStep)) {
      return;
    }

    this._currentIndex = nextIndex;
    this.currentIndexChange.emit(nextIndex);
    this.stepChange.emit(nextStep);
  }

  private getKeyboardTargetIndex(key: string, index: number): number | null {
    if (key === 'Home') {
      return this.findEnabledStepIndex(0, 1);
    }

    if (key === 'End') {
      return this.findEnabledStepIndex(this.steps.length - 1, -1);
    }

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      return this.findEnabledStepIndex(index + 1, 1);
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      return this.findEnabledStepIndex(index - 1, -1);
    }

    return null;
  }

  private findEnabledStepIndex(startIndex: number, direction: 1 | -1): number | null {
    for (let index = startIndex; index >= 0 && index < this.steps.length; index += direction) {
      if (!this.isStepDisabled(this.steps[index])) {
        return index;
      }
    }

    return null;
  }

  private focusStep(index: number): void {
    const step = this.steps[index];

    if (!step || !this.isStepClickable(step)) {
      return;
    }

    this.setCurrentIndex(index);

    window.requestAnimationFrame(() => {
      const element = document.querySelector<HTMLElement>(`[data-stepper-index="${index}"]`);
      element?.focus();
    });
  }
}
