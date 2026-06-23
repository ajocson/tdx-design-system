import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressBarModule } from '../shared/components/progress-bar';
import { ProgressIndicatorPreviewComponent } from './progress-indicator-preview.component';

@NgModule({
  declarations: [ProgressIndicatorPreviewComponent],
  exports: [ProgressIndicatorPreviewComponent],
  imports: [CommonModule, ProgressBarModule],
})
export class ProgressIndicatorPreviewModule {}
