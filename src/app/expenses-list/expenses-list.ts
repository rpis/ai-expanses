import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../database/database';
import { Expense } from '../models/expense.model';
import { Category } from '../models/category.model';
import { Bank } from '../models/bank.model';

@Component({
  selector: 'app-expenses-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expenses-list.html',
  styleUrl: './expenses-list.css',
})
export class ExpensesList implements OnInit {
  private databaseService = inject(DatabaseService);

  expenses = signal<Expense[]>([]);
  categories = signal<Map<number, string>>(new Map());
  banks = signal<Map<number, string>>(new Map());

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    const [expensesData, categoriesData, banksData] = await Promise.all([
      this.databaseService.getExpenses(),
      this.databaseService.getCategories(),
      this.databaseService.getBanks()
    ]);

    this.expenses.set(expensesData);

    const catMap = new Map<number, string>();
    categoriesData.forEach(c => {
      if (c.id) catMap.set(c.id, c.name);
    });
    this.categories.set(catMap);

    const bankMap = new Map<number, string>();
    banksData.forEach(b => {
      if (b.id) bankMap.set(b.id, b.name);
    });
    this.banks.set(bankMap);
  }

  getCategoryName(id: number): string {
    return this.categories().get(id) || 'Unknown Category';
  }

  getBankName(id: number): string {
    return this.banks().get(id) || 'Unknown Bank';
  }
}
