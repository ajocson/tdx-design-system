import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonPreviewModule } from './button-preview/button-preview.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, ButtonPreviewModule],
})
export class AppModule {}
