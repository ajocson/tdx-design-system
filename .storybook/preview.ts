import type { Preview } from '@storybook/angular';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Components',
          [
            'Button',
            [
              'Docs',
              'Playground',
              'Primary',
              'Secondary',
              'Success',
              'Danger',
              'Warning',
              'Discovery',
              'Subtle',
              'Loading',
              'Disabled',
            ],
            'Stepper',
            'Tag',
            'Progress Bar',
            ['Playground', 'Brand', 'Success', 'Processing'],
          ],
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
