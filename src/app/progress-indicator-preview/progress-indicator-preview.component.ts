import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TdxProgressBarVariant } from '../shared/components/progress-bar';

interface ProgressBarPreviewItem {
  label: string;
  variant: TdxProgressBarVariant;
}

@Component({
  selector: 'app-progress-indicator-preview',
  standalone: false,
  templateUrl: './progress-indicator-preview.component.html',
  styleUrls: ['./progress-indicator-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressIndicatorPreviewComponent implements OnInit, OnDestroy {
  readonly progressBars: ProgressBarPreviewItem[] = [
    { label: 'Brand', variant: 'brand' },
    { label: 'Success', variant: 'success' },
    { label: 'Processing', variant: 'processing' },
  ];

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
