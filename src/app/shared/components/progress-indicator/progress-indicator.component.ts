import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TdxProgressIndicatorValueType } from './progress-indicator.model';

@Component({
  selector: 'tdx-progress-indicator, app-progress-indicator',
  standalone: false,
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressIndicatorComponent {
  private _progress = 20;

  @Input() label = 'Label';
  @Input() valueType: TdxProgressIndicatorValueType = 'fraction';
  @Input() showFractionValue = true;
  @Input() fractionValue = '1/5';
  @Input() showPercentValue = true;
  @Input() percentageValue = '75%';

  @Input()
  set progress(value: number) {
    this._progress = Number.isFinite(value) ? Math.min(Math.max(value, 0), 100) : 0;
  }

  get progress(): number {
    return this._progress;
  }

  get displayedValue(): string | null {
    if (this.valueType === 'fraction') {
      return this.showFractionValue ? this.fractionValue : null;
    }

    return this.showPercentValue ? this.percentageValue : null;
  }

  get ariaLabel(): string {
    return this.label || 'Progress';
  }

  get indicatorClasses(): Record<string, boolean> {
    return {
      [`tdx-progress-indicator--${this.valueType}`]: true,
    };
  }
}
