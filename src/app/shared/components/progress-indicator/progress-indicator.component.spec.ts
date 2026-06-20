import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProgressIndicatorComponent } from './progress-indicator.component';
import { ProgressIndicatorModule } from './progress-indicator.module';

describe('ProgressIndicatorComponent', () => {
  let component: ProgressIndicatorComponent;
  let fixture: ComponentFixture<ProgressIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressIndicatorModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the label and fraction value by default', () => {
    fixture.componentRef.setInput('label', 'Profile completion');
    fixture.componentRef.setInput('fractionValue', '1/5');
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('.tdx-progress-indicator__label')).nativeElement as HTMLElement;
    const value = fixture.debugElement.query(By.css('.tdx-progress-indicator__value')).nativeElement as HTMLElement;

    expect(label.textContent?.trim()).toBe('Profile completion');
    expect(value.textContent?.trim()).toBe('1/5');
  });

  it('renders the percentage value when percentage is selected', () => {
    fixture.componentRef.setInput('valueType', 'percentage');
    fixture.componentRef.setInput('percentageValue', '75%');
    fixture.detectChanges();

    const indicator = fixture.debugElement.query(By.css('.tdx-progress-indicator')).nativeElement as HTMLElement;
    const value = fixture.debugElement.query(By.css('.tdx-progress-indicator__value')).nativeElement as HTMLElement;

    expect(indicator.classList).toContain('tdx-progress-indicator--percentage');
    expect(value.textContent?.trim()).toBe('75%');
  });

  it('hides the fraction value when requested', () => {
    fixture.componentRef.setInput('showFractionValue', false);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.tdx-progress-indicator__value'))).toBeNull();
  });

  it('hides the percentage value when requested', () => {
    fixture.componentRef.setInput('valueType', 'percentage');
    fixture.componentRef.setInput('showPercentValue', false);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.tdx-progress-indicator__value'))).toBeNull();
  });

  it('applies progress to the fill and progressbar attributes', () => {
    fixture.componentRef.setInput('progress', 60);
    fixture.detectChanges();

    const fill = fixture.debugElement.query(By.css('.tdx-progress-indicator__fill')).nativeElement as HTMLElement;
    const track = fixture.debugElement.query(By.css('[role="progressbar"]')).nativeElement as HTMLElement;

    expect(fill.style.width).toBe('60%');
    expect(track.getAttribute('aria-valuenow')).toBe('60');
    expect(track.getAttribute('aria-valuemin')).toBe('0');
    expect(track.getAttribute('aria-valuemax')).toBe('100');
  });

  it('clamps progress between zero and one hundred', () => {
    fixture.componentRef.setInput('progress', 150);
    fixture.detectChanges();

    const fill = fixture.debugElement.query(By.css('.tdx-progress-indicator__fill')).nativeElement as HTMLElement;
    expect(fill.style.width).toBe('100%');

    fixture.componentRef.setInput('progress', -20);
    fixture.detectChanges();

    expect(fill.style.width).toBe('0%');
  });
});
