import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TdxButtonSize, TdxButtonVariant } from '../shared/components/button/button.model';

@Component({
  selector: 'app-progress-indicator-preview',
  standalone: false,
  templateUrl: './progress-indicator-preview.component.html',
  styleUrls: ['./progress-indicator-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressIndicatorPreviewComponent implements OnInit, OnDestroy {
  readonly totalSteps = 10;
  readonly TdxButtonSize = TdxButtonSize;
  readonly TdxButtonVariant = TdxButtonVariant;

  currentStep = 1;
  percentageProgress = 0;

  private percentageTimer?: ReturnType<typeof setInterval>;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  get fractionProgress(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  get fractionValue(): string {
    return `${this.currentStep}/${this.totalSteps}`;
  }

  get percentageValue(): string {
    return `${this.percentageProgress}%`;
  }

  get canGoBack(): boolean {
    return this.currentStep > 1;
  }

  get canGoNext(): boolean {
    return this.currentStep < this.totalSteps;
  }

  ngOnInit(): void {
    this.percentageTimer = setInterval(() => {
      this.percentageProgress = (this.percentageProgress + 1) % 101;
      this.changeDetectorRef.markForCheck();
    }, 80);
  }

  ngOnDestroy(): void {
    if (this.percentageTimer) {
      clearInterval(this.percentageTimer);
    }
  }

  goBack(): void {
    this.currentStep = Math.max(1, this.currentStep - 1);
  }

  goNext(): void {
    this.currentStep = Math.min(this.totalSteps, this.currentStep + 1);
  }
}
