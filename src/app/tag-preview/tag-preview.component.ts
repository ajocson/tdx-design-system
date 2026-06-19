import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TdxTagEmphasis, TdxTagVariant } from '../shared/components/tag';

type TagPreviewState = 'default' | 'hover' | 'pressed' | 'focus' | 'active';

interface TagPreviewColor {
  label: string;
  states: readonly TagPreviewState[];
  variant: TdxTagVariant;
}

@Component({
  selector: 'app-tag-preview',
  standalone: false,
  templateUrl: './tag-preview.component.html',
  styleUrls: ['./tag-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagPreviewComponent {
  readonly colors: readonly TagPreviewColor[] = [
    {
      label: 'Default',
      variant: TdxTagVariant.Neutral,
      states: ['default', 'hover', 'pressed', 'focus', 'active'],
    },
    {
      label: 'Purple',
      variant: TdxTagVariant.Primary,
      states: ['default', 'hover', 'pressed', 'focus'],
    },
    {
      label: 'Green',
      variant: TdxTagVariant.Success,
      states: ['default', 'hover', 'pressed', 'focus'],
    },
    {
      label: 'Yellow',
      variant: TdxTagVariant.Warning,
      states: ['default', 'hover', 'pressed', 'focus'],
    },
    {
      label: 'Red',
      variant: TdxTagVariant.Danger,
      states: ['default', 'hover', 'pressed', 'focus'],
    },
    {
      label: 'Info',
      variant: TdxTagVariant.Info,
      states: ['default', 'hover', 'pressed', 'focus'],
    },
  ];

  readonly TdxTagEmphasis = TdxTagEmphasis;
  readonly TdxTagVariant = TdxTagVariant;
}
