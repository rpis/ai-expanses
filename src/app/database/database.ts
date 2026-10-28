import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Expense } from '../models/expense.model';
import { Category } from '../models/category.model';
import { Bank } from '../models/bank.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService extends Dexie {
  expenses!: Table<Expense, number>;
  categories!: Table<Category, number>;
  banks!: Table<Bank, number>;

  constructor() {
    super('ExpenseTrackerDB');
    this.version(1).stores({
      expenses: '++id, date, categoryId, bankId',
      categories: '++id, name',
      banks: '++id, name'
    });
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return this.categories.toArray();
  }

  async addCategory(name: string): Promise<number> {
    return this.categories.add({ name });
  }

  // Banks
  async getBanks(): Promise<Bank[]> {
    return this.banks.toArray();
  }

  async addBank(name: string): Promise<number> {
    return this.banks.add({ name });
  }

  // Expenses
  async getExpenses(): Promise<Expense[]> {
    return this.expenses.orderBy('date').reverse().toArray();
  }

  async addExpense(expense: Expense): Promise<number> {
    return this.expenses.add(expense);
  }

  async deleteExpense(id: number): Promise<void> {
    return this.expenses.delete(id);
  }
}
