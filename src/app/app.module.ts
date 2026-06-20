import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonPreviewModule } from './button-preview/button-preview.module';
import { HomeComponent } from './home/home.component';
import { ProgressIndicatorPreviewModule } from './progress-indicator-preview/progress-indicator-preview.module';
import { StepperPreviewModule } from './stepper-preview/stepper-preview.module';
import { TagPreviewModule } from './tag-preview/tag-preview.module';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonPreviewModule,
    ProgressIndicatorPreviewModule,
    StepperPreviewModule,
    TagPreviewModule,
  ],
})
export class AppModule {}
