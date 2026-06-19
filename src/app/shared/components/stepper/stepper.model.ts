export type StepperOrientation = 'vertical' | 'horizontal';

export type StepperSpecialState = 'default' | 'incomplete' | 'disabled';

export type StepperVisualState = 'completed' | 'current' | 'upcoming' | 'incomplete' | 'disabled';

export interface StepperStep {
  label: string;
  number?: number | string;
  state?: StepperSpecialState;
}

export const STEPPER_ORIENTATIONS: readonly StepperOrientation[] = ['vertical', 'horizontal'] as const;
