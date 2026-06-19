import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  TDX_BUTTON_EMPHASIS,
  TDX_BUTTON_SIZES,
  TDX_BUTTON_VARIANTS,
  TdxButtonEmphasis,
  TdxButtonSize,
  TdxButtonVariant,
} from '../shared/components/button/button.model';

interface ButtonPreviewRow {
  readonly variant: TdxButtonVariant;
  readonly emphasis: readonly TdxButtonEmphasis[];
}

@Component({
  selector: 'tdx-button-preview',
  standalone: false,
  templateUrl: './button-preview.component.html',
  styleUrls: ['./button-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonPreviewComponent {
  readonly buttonRows: readonly ButtonPreviewRow[] = TDX_BUTTON_VARIANTS.map((variant) => ({
    variant,
    emphasis: this.getSupportedEmphasis(variant),
  }));
  readonly loadingVariants = TDX_BUTTON_VARIANTS;
  readonly sizes = TDX_BUTTON_SIZES;
  readonly TdxButtonEmphasis = TdxButtonEmphasis;
  readonly TdxButtonSize = TdxButtonSize;
  readonly TdxButtonVariant = TdxButtonVariant;

  private getSupportedEmphasis(variant: TdxButtonVariant): readonly TdxButtonEmphasis[] {
    if (variant === TdxButtonVariant.Subtle) {
      return [TdxButtonEmphasis.DEFAULT];
    }

    return TDX_BUTTON_EMPHASIS;
  }
}
