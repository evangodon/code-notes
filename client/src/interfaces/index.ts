export type Category = 'python' | 'node' | 'javascript' | 'docker' | '';

export interface PracticeCard {
  id: string | -1;
  category: Category;
  question: string;
  answer: string;
}
