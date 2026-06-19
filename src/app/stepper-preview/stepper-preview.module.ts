import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '../shared/components/button/button.module';
import { StepperModule } from '../shared/components/stepper/stepper.module';
import { StepperPreviewComponent } from './stepper-preview.component';

@NgModule({
  declarations: [StepperPreviewComponent],
  exports: [StepperPreviewComponent],
  imports: [CommonModule, ButtonModule, StepperModule],
})
export class StepperPreviewModule {}
