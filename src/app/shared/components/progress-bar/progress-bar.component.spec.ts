import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProgressBarComponent } from './progress-bar.component';
import { ProgressBarModule } from './progress-bar.module';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the brand variant by default', () => {
    const progressBar = fixture.debugElement.query(By.css('.tdx-progress-bar')).nativeElement as HTMLElement;
    expect(progressBar.classList).toContain('tdx-progress-bar--brand');
  });

  it('renders the requested variant and progress', () => {
    fixture.componentRef.setInput('variant', 'processing');
    fixture.componentRef.setInput('progress', 75);
    fixture.detectChanges();

    const progressBar = fixture.debugElement.query(By.css('.tdx-progress-bar')).nativeElement as HTMLElement;
    const fill = fixture.debugElement.query(By.css('.tdx-progress-bar__fill')).nativeElement as HTMLElement;

    expect(progressBar.classList).toContain('tdx-progress-bar--processing');
    expect(fill.style.width).toBe('75%');
  });

  it('clamps progress values for accessible progressbar semantics', () => {
    fixture.componentRef.setInput('progress', 120);
    fixture.detectChanges();

    const progressBar = fixture.debugElement.query(By.css('[role="progressbar"]')).nativeElement as HTMLElement;
    expect(progressBar.getAttribute('aria-valuenow')).toBe('100');
  });
});
