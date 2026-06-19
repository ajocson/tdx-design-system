import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TdxTagEmphasis, TdxTagIcon, TdxTagVariant } from './tag.model';

@Component({
  selector: 'tdx-tag, app-tag',
  standalone: false,
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {
  @Input() label = 'Tag';
  @Input() variant: TdxTagVariant = TdxTagVariant.Neutral;
  @Input() emphasis: TdxTagEmphasis = TdxTagEmphasis.Subtle;
  @Input() leadingIcon: TdxTagIcon = null;
  @Input() removable = false;
  @Input() disabled = false;

  @Output() removed = new EventEmitter<void>();

  get tagClasses(): Record<string, boolean> {
    return {
      [`tdx-tag--${this.variant}`]: true,
      [`tdx-tag--${this.emphasis}`]: true,
      'tdx-tag--removable': this.removable,
      'tdx-tag--disabled': this.disabled,
    };
  }

  get removeAriaLabel(): string {
    return `Remove ${this.label || 'tag'}`;
  }

  handleRemove(event: MouseEvent): void {
    event.stopPropagation();

    if (this.disabled) {
      event.preventDefault();
      return;
    }

    this.removed.emit();
  }
}
