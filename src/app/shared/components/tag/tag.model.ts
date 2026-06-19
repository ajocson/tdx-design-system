export enum TdxTagVariant {
  Neutral = 'neutral',
  Primary = 'primary',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
  Info = 'info',
}

export enum TdxTagEmphasis {
  Filled = 'filled',
  Subtle = 'subtle',
  Outline = 'outline',
}

export type TdxTagIcon = string | null | undefined;

export const TDX_TAG_VARIANTS: readonly TdxTagVariant[] = [
  TdxTagVariant.Neutral,
  TdxTagVariant.Primary,
  TdxTagVariant.Success,
  TdxTagVariant.Warning,
  TdxTagVariant.Danger,
  TdxTagVariant.Info,
] as const;

export const TDX_TAG_EMPHASIS: readonly TdxTagEmphasis[] = [
  TdxTagEmphasis.Filled,
  TdxTagEmphasis.Subtle,
  TdxTagEmphasis.Outline,
] as const;
