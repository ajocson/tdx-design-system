import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TagModule } from '../shared/components/tag';
import { TagPreviewComponent } from './tag-preview.component';

@NgModule({
  declarations: [TagPreviewComponent],
  exports: [TagPreviewComponent],
  imports: [CommonModule, TagModule],
})
export class TagPreviewModule {}
