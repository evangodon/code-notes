import { css } from 'styled-components';

export const variables: { [index: string]: string } = {
  /* Colors */
  __color_primary_light: '#90cdf4',
  __color_primary: '#FF1744',
  __color_primary_dark: '#00E676',
  __color_secondary_light: '#d6bcfa',
  __color_secondary: '#9f7aea',
  __color_secondary_dark: '#6b46c1',

  __color_green: '#00E676',
  __color_red: '#E53E3E',

  __white: '#ffffff',
  __black: '#000000',
  __grey_100: '#f7fafc',
  __grey_200: '#edf2f7',
  __grey_300: '#e2e8f0',
  __grey_400: '#cbd5e0',
  __grey_500: '#a0aec0',
  __grey_600: '#718096',
  __grey_700: '#4a5568',
  __grey_800: '#33363b',
  __grey_900: '#1e1f22',

  /* Font-sizes */
  __fs_xsmall: '1rem',
  __fs_small: '1.2rem',
  __fs_medium: '1.4rem',
  __fs_base: '1.6rem',
  __fs_large: '2rem',
  __fs_xlarge: '3.6rem',

  /* Font Color */
  __fc_default: 'var(--color-primary)',

  __app_width: '100rem',
  __border_radius: '0',
};

/* Turn js keys into valid css custom properties */
export const customProperties = Object.keys(variables).map(
  (key) => `${[key.replace(/_/g, '-')]}: ${variables[key]};`
);

const sizes = {
  desktop: 1920,
  tablet: 900,
  mobile: 700,
};

/* Iterate through the sizes and create a media template */
export const media = (Object.keys(sizes) as (keyof typeof sizes)[]).reduce(
  (acc, label) => {
    acc[label] = (first: any, ...interpolations: any[]) => css`
      @media (max-width: ${sizes[label] / 16}em) {
        ${css(first, ...interpolations)}
      }
    `;

    return acc;
  },
  {} as { [key in keyof typeof sizes]: any }
);
