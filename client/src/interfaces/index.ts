export type Category =
  | 'python'
  | 'node'
  | 'javascript'
  | 'docker'
  | 'postgresql'
  | '';

export interface PracticeCard {
  id: string | -1;
  category: Category;
  question: string;
  answer: string;
}
