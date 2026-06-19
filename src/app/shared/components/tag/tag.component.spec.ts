import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TagComponent } from './tag.component';
import { TdxTagEmphasis, TdxTagVariant } from './tag.model';
import { TagModule } from './tag.module';

describe('TagComponent', () => {
  let component: TagComponent;
  let fixture: ComponentFixture<TagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders the label', () => {
    fixture.componentRef.setInput('label', 'Reviewed');
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('.tdx-tag__label')).nativeElement as HTMLElement;

    expect(label.textContent?.trim()).toBe('Reviewed');
  });

  it('renders a decorative leading icon when provided', () => {
    fixture.componentRef.setInput('leadingIcon', 'info');
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('.tdx-tag__icon')).nativeElement as HTMLElement;

    expect(icon.textContent?.trim()).toBe('info');
    expect(icon.getAttribute('aria-hidden')).toBe('true');
  });

  it('applies variant and emphasis classes', () => {
    fixture.componentRef.setInput('variant', TdxTagVariant.Success);
    fixture.componentRef.setInput('emphasis', TdxTagEmphasis.Outline);
    fixture.detectChanges();

    const tag = fixture.debugElement.query(By.css('.tdx-tag')).nativeElement as HTMLElement;

    expect(tag.classList).toContain('tdx-tag--success');
    expect(tag.classList).toContain('tdx-tag--outline');
  });

  it('renders a removable action when removable is true', () => {
    fixture.componentRef.setInput('removable', true);
    fixture.componentRef.setInput('label', 'Status');
    fixture.detectChanges();

    const remove = fixture.debugElement.query(By.css('.tdx-tag__remove')).nativeElement as HTMLButtonElement;

    expect(remove).toBeTruthy();
    expect(remove.getAttribute('aria-label')).toBe('Remove Status');
  });

  it('emits removed when the remove action is clicked', () => {
    spyOn(component.removed, 'emit');
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();

    const remove = fixture.debugElement.query(By.css('.tdx-tag__remove')).nativeElement as HTMLButtonElement;
    remove.click();

    expect(component.removed.emit).toHaveBeenCalledTimes(1);
  });

  it('disables the remove action and does not emit when disabled', () => {
    spyOn(component.removed, 'emit');
    fixture.componentRef.setInput('removable', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const remove = fixture.debugElement.query(By.css('.tdx-tag__remove')).nativeElement as HTMLButtonElement;
    remove.click();

    expect(remove.disabled).toBeTrue();
    expect(component.removed.emit).not.toHaveBeenCalled();
  });
});
