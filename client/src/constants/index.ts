import { Category } from '@interfaces';
export const DEV = process.env.NODE_ENV === 'development';
export const PROD = process.env.NODE_ENV === 'production';
export const isSSR = typeof window === 'undefined';

export const CATEGORIES: Category[] = [
  'python',
  'javascript',
  'node',
  'docker',
  'postgresql',
];
