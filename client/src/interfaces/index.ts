export type Category = 'python' | 'node' | 'javascript';

export interface PracticeCard {
  id: string;
  title: string;
  category: Category;
  answer: string;
}
