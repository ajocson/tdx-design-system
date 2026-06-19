import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TdxButtonEmphasis, TdxButtonIcon, TdxButtonSize, TdxButtonVariant } from './button.model';

@Component({
  selector: 'tdx-button, app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  private _emphasis: TdxButtonEmphasis = TdxButtonEmphasis.DEFAULT;

  @Input() label = 'Button';
  @Input() variant: TdxButtonVariant = TdxButtonVariant.Primary;
  @Input() size: TdxButtonSize = TdxButtonSize.Medium;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() leftIcon: TdxButtonIcon = null;
  @Input() rightIcon: TdxButtonIcon = null;
  @Input() ariaLabel?: string;
  @Input() ariaExpanded?: boolean;
  @Input() ariaControls?: string;
  @Input() ariaPressed?: boolean;

  @Output() clicked = new EventEmitter<MouseEvent>();

  @Input()
  set emphasis(value: TdxButtonEmphasis) {
    this._emphasis = value ?? TdxButtonEmphasis.DEFAULT;
  }

  get emphasis(): TdxButtonEmphasis {
    return this._emphasis;
  }

  @Input()
  set appearance(value: TdxButtonEmphasis) {
    this.emphasis = value;
  }

  get appearance(): TdxButtonEmphasis {
    return this.emphasis;
  }

  get isInteractionDisabled(): boolean {
    return this.disabled || this.isLoading;
  }

  get isLoading(): boolean {
    return this.loading && !this.disabled;
  }

  get resolvedEmphasis(): TdxButtonEmphasis {
    if (this.variant === TdxButtonVariant.Subtle && this.emphasis !== TdxButtonEmphasis.DEFAULT) {
      return TdxButtonEmphasis.DEFAULT;
    }

    return this.emphasis;
  }

  get buttonClasses(): Record<string, boolean> {
    return {
      [`tdx-button--${this.variant}`]: true,
      [`tdx-button--${this.resolvedEmphasis}`]: true,
      [`tdx-button--${this.size}`]: true,
      'tdx-button--loading': this.isLoading,
      'tdx-button--icon-only': !this.label && (!!this.leftIcon || !!this.rightIcon),
    };
  }

  handleClick(event: MouseEvent): void {
    if (this.isInteractionDisabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    this.clicked.emit(event);
  }
}
