import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StepperComponent } from './stepper.component';
import { StepperModule } from './stepper.module';
import { StepperStep } from './stepper.model';

const STEPS: StepperStep[] = [
  { label: 'Account' },
  { label: 'Profile' },
  { label: 'Review' },
];

describe('StepperComponent', () => {
  let fixture: ComponentFixture<StepperComponent>;
  let component: StepperComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepperModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StepperComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('steps', STEPS);
    fixture.detectChanges();
  });

  it('creates the stepper', () => {
    expect(component).toBeTruthy();
  });

  it('calculates completed, current, and upcoming states from currentIndex', () => {
    fixture.componentRef.setInput('currentIndex', 1);
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.tdx-stepper__item'));

    expect(items[0].nativeElement.dataset['state']).toBe('completed');
    expect(items[1].nativeElement.dataset['state']).toBe('current');
    expect(items[2].nativeElement.dataset['state']).toBe('upcoming');
    expect(items[1].query(By.css('.tdx-stepper__step')).attributes['aria-current']).toBe('step');
  });

  it('shows custom numbers when supplied', () => {
    fixture.componentRef.setInput('steps', [{ label: 'Beneficiary', number: 10 }, { label: 'Review', number: 'A' }]);
    fixture.detectChanges();

    const numbers = fixture.debugElement.queryAll(By.css('.tdx-stepper__number'));

    expect(numbers[0].nativeElement.textContent.trim()).toBe('10');
    expect(numbers[1].nativeElement.textContent.trim()).toBe('A');
  });

  it('renders incomplete and disabled special states', () => {
    fixture.componentRef.setInput('steps', [
      { label: 'Account' },
      { label: 'Profile', state: 'incomplete' },
      { label: 'Review', state: 'disabled' },
    ]);
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.tdx-stepper__item'));

    expect(items[1].nativeElement.dataset['state']).toBe('incomplete');
    expect(items[1].nativeElement.textContent).toContain('warning');
    expect(items[2].nativeElement.dataset['state']).toBe('disabled');
    expect(items[2].query(By.css('.tdx-stepper__step')).nativeElement.tagName.toLowerCase()).toBe('div');
  });

  it('uses the Figma completed-state icon', () => {
    fixture.componentRef.setInput('steps', [{ label: 'Account', state: 'completed' }]);
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('.tdx-stepper__icon'));

    expect(icon.nativeElement.textContent.trim()).toBe('check_circle');
  });

  it('renders configured visual states without deriving them from the current index', () => {
    fixture.componentRef.setInput('steps', [
      { label: 'Account', state: 'completed' },
      { label: 'Profile', state: 'current' },
      { label: 'Review', state: 'upcoming' },
    ]);
    fixture.componentRef.setInput('currentIndex', 0);
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.tdx-stepper__item'));

    expect(items[0].nativeElement.dataset['state']).toBe('completed');
    expect(items[1].nativeElement.dataset['state']).toBe('current');
    expect(items[2].nativeElement.dataset['state']).toBe('upcoming');
  });

  it('uses button semantics and emits changes when clickable steps are enabled', () => {
    spyOn(component.currentIndexChange, 'emit');
    spyOn(component.stepChange, 'emit');
    fixture.componentRef.setInput('clickableSteps', true);
    fixture.detectChanges();

    fixture.debugElement.queryAll(By.css('button.tdx-stepper__step'))[2].triggerEventHandler('click', new MouseEvent('click'));

    expect(component.currentIndexChange.emit).toHaveBeenCalledWith(2);
    expect(component.stepChange.emit).toHaveBeenCalledWith(STEPS[2]);
  });

  it('does not emit when a disabled or incomplete step is clicked', () => {
    spyOn(component.currentIndexChange, 'emit');
    fixture.componentRef.setInput('clickableSteps', true);
    fixture.componentRef.setInput('steps', [
      { label: 'Account' },
      { label: 'Review', state: 'disabled' },
      { label: 'Confirmation', state: 'incomplete' },
    ]);
    fixture.detectChanges();

    fixture.debugElement.queryAll(By.css('button.tdx-stepper__step'))[1].triggerEventHandler('click', new MouseEvent('click'));
    fixture.debugElement.queryAll(By.css('button.tdx-stepper__step'))[2].triggerEventHandler('click', new MouseEvent('click'));

    expect(component.currentIndexChange.emit).not.toHaveBeenCalled();
  });

  it('moves back and next within bounds', () => {
    spyOn(component.currentIndexChange, 'emit');
    fixture.componentRef.setInput('currentIndex', 1);
    fixture.detectChanges();

    component.goNext();
    component.goNext();
    component.goBack();

    expect(component.currentIndexChange.emit).toHaveBeenCalledWith(2);
    expect(component.currentIndexChange.emit).toHaveBeenCalledWith(1);
  });

  it('stops navigation at disabled and incomplete steps', () => {
    spyOn(component.currentIndexChange, 'emit');
    fixture.componentRef.setInput('steps', [
      { label: 'Account' },
      { label: 'Profile', state: 'disabled' },
      { label: 'Review', state: 'incomplete' },
    ]);
    fixture.detectChanges();

    component.goNext();
    component.goBack();

    expect(component.currentIndexChange.emit).not.toHaveBeenCalled();
    expect(component.canGoNext).toBeFalse();

    fixture.componentRef.setInput('currentIndex', 2);
    fixture.detectChanges();

    component.goBack();

    expect(component.currentIndexChange.emit).not.toHaveBeenCalled();
  });

  it('applies horizontal connector toggle classes', () => {
    fixture.componentRef.setInput('orientation', 'horizontal');
    fixture.componentRef.setInput('showLeftConnector', false);
    fixture.componentRef.setInput('showRightConnector', false);
    fixture.detectChanges();

    const root = fixture.debugElement.query(By.css('.tdx-stepper')).nativeElement as HTMLElement;

    expect(root.classList).toContain('tdx-stepper--horizontal');
    expect(root.classList).toContain('tdx-stepper--hide-left-connector');
    expect(root.classList).toContain('tdx-stepper--hide-right-connector');
  });

  it('keeps orientation visual and not on the native ordered list ARIA', () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();

    const list = fixture.debugElement.query(By.css('.tdx-stepper__list')).nativeElement as HTMLOListElement;

    expect(list.tagName.toLowerCase()).toBe('ol');
    expect(list.hasAttribute('aria-orientation')).toBeFalse();
  });
});
