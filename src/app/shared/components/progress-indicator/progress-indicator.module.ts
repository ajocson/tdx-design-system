import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressBarModule } from '../progress-bar/progress-bar.module';
import { ProgressIndicatorComponent } from './progress-indicator.component';

@NgModule({
  declarations: [ProgressIndicatorComponent],
  exports: [ProgressIndicatorComponent],
  imports: [CommonModule, ProgressBarModule],
})
export class ProgressIndicatorModule {}
