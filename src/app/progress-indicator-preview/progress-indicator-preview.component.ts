import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-progress-indicator-preview',
  standalone: false,
  templateUrl: './progress-indicator-preview.component.html',
  styleUrls: ['./progress-indicator-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressIndicatorPreviewComponent {}
