export enum TdxButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Discovery = 'discovery',
  Subtle = 'subtle',
  Error = 'danger',
  Info = 'discovery',
  Neutral = 'subtle',
}

export enum TdxButtonEmphasis {
  DEFAULT = 'default',
  OUTLINE = 'outline',
  TRANSPARENT = 'transparent',
}

export { TdxButtonEmphasis as TdxButtonAppearance };

export enum TdxButtonSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type TdxButtonIcon = string | null | undefined;

export const TDX_BUTTON_VARIANTS: readonly TdxButtonVariant[] = [
  TdxButtonVariant.Primary,
  TdxButtonVariant.Secondary,
  TdxButtonVariant.Success,
  TdxButtonVariant.Danger,
  TdxButtonVariant.Warning,
  TdxButtonVariant.Discovery,
  TdxButtonVariant.Subtle,
] as const;

export const TDX_BUTTON_EMPHASIS: readonly TdxButtonEmphasis[] = [
  TdxButtonEmphasis.DEFAULT,
  TdxButtonEmphasis.OUTLINE,
  TdxButtonEmphasis.TRANSPARENT,
] as const;

export { TDX_BUTTON_EMPHASIS as TDX_BUTTON_APPEARANCES };

export const TDX_BUTTON_SIZES: readonly TdxButtonSize[] = [
  TdxButtonSize.Small,
  TdxButtonSize.Medium,
  TdxButtonSize.Large,
] as const;
