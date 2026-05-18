import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonPreviewComponent } from './button-preview/button-preview.component';

const routes: Routes = [
  {
    path: 'buttons',
    component: ButtonPreviewComponent,
    title: 'TDX Button Preview',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'buttons',
  },
  {
    path: '**',
    redirectTo: 'buttons',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
})
export class AppRoutingModule {}

