import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tdx-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
