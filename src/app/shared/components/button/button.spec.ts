import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TdxButtonEmphasis, TdxButtonSize, TdxButtonVariant } from './button.model';
import { ButtonComponent } from './button.component';
import { ButtonModule } from './button.module';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the button', () => {
    expect(component).toBeTruthy();
  });

  it('renders label, variant, emphasis, and size classes', () => {
    fixture.componentRef.setInput('label', 'Continue');
    fixture.componentRef.setInput('variant', TdxButtonVariant.Success);
    fixture.componentRef.setInput('emphasis', TdxButtonEmphasis.OUTLINE);
    fixture.componentRef.setInput('size', TdxButtonSize.Large);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;

    expect(button.textContent).toContain('Continue');
    expect(button.classList).toContain('tdx-button--success');
    expect(button.classList).toContain('tdx-button--outline');
    expect(button.classList).toContain('tdx-button--large');
    expect(button.dataset['emphasis']).toBe(TdxButtonEmphasis.OUTLINE);
  });

  it('uses default emphasis by default', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;

    expect(button.classList).toContain('tdx-button--default');
  });

  it('falls subtle unsupported emphasis back to default', () => {
    fixture.componentRef.setInput('variant', TdxButtonVariant.Subtle);
    fixture.componentRef.setInput('emphasis', TdxButtonEmphasis.TRANSPARENT);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;

    expect(button.classList).toContain('tdx-button--subtle');
    expect(button.classList).toContain('tdx-button--default');
    expect(button.classList).not.toContain('tdx-button--transparent');
    expect(button.dataset['emphasis']).toBe(TdxButtonEmphasis.DEFAULT);
    expect(button.dataset['appearance']).toBe(TdxButtonEmphasis.DEFAULT);
  });

  it('keeps the appearance input as a compatibility alias for emphasis', () => {
    fixture.componentRef.setInput('appearance', TdxButtonEmphasis.OUTLINE);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;

    expect(button.classList).toContain('tdx-button--outline');
    expect(button.dataset['emphasis']).toBe(TdxButtonEmphasis.OUTLINE);
  });

  it('emits clicked when interactive', () => {
    spyOn(component.clicked, 'emit');

    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', new MouseEvent('click'));

    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('does not emit clicked when disabled', () => {
    spyOn(component.clicked, 'emit');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', new MouseEvent('click'));

    expect(component.clicked.emit).not.toHaveBeenCalled();
  });

  it('does not emit clicked when loading', () => {
    spyOn(component.clicked, 'emit');
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    const loadingDots = fixture.debugElement.queryAll(By.css('.tdx-button__loading-dot'));
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', new MouseEvent('click'));

    expect(button.disabled).toBeFalse();
    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect(loadingDots.length).toBe(3);
    expect(component.clicked.emit).not.toHaveBeenCalled();
  });

  it('treats disabled as standalone when disabled and loading are both passed', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    const loadingDots = fixture.debugElement.queryAll(By.css('.tdx-button__loading-dot'));

    expect(button.disabled).toBeTrue();
    expect(button.classList).not.toContain('tdx-button--loading');
    expect(loadingDots.length).toBe(0);
  });

  it('renders optional icons', () => {
    fixture.componentRef.setInput('leftIcon', 'arrow_back');
    fixture.componentRef.setInput('rightIcon', 'arrow_forward');
    fixture.detectChanges();

    const icons = fixture.debugElement.queryAll(By.css('.tdx-button__icon'));

    expect(icons.length).toBe(2);
    expect(icons[0].nativeElement.textContent).toContain('arrow_back');
    expect(icons[1].nativeElement.textContent).toContain('arrow_forward');
  });
});
