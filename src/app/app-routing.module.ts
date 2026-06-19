import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonPreviewComponent } from './button-preview/button-preview.component';
import { HomeComponent } from './home/home.component';
import { StepperPreviewComponent } from './stepper-preview/stepper-preview.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    title: 'TDX Design System Preview',
  },
  {
    path: 'buttons',
    component: ButtonPreviewComponent,
    title: 'TDX Button Preview',
  },
  {
    path: 'stepper',
    component: StepperPreviewComponent,
    title: 'TDX Stepper Preview',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
})
export class AppRoutingModule {}
