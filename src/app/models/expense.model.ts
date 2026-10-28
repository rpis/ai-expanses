export interface Expense {
  id?: number;
  date: string; // ISO date string
  categoryId: number;
  amount: number;
  notes: string;
  bankId: number;
}
