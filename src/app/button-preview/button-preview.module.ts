import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '../shared/components/button/button.module';
import { ButtonPreviewComponent } from './button-preview.component';

@NgModule({
  declarations: [ButtonPreviewComponent],
  exports: [ButtonPreviewComponent],
  imports: [CommonModule, ButtonModule],
})
export class ButtonPreviewModule {}

