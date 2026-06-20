import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressIndicatorModule } from '../shared/components/progress-indicator';
import { ProgressIndicatorPreviewComponent } from './progress-indicator-preview.component';

@NgModule({
  declarations: [ProgressIndicatorPreviewComponent],
  exports: [ProgressIndicatorPreviewComponent],
  imports: [CommonModule, ProgressIndicatorModule],
})
export class ProgressIndicatorPreviewModule {}
