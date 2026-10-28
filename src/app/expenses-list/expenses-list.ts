import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DatabaseService } from '../database/database';
import { Expense } from '../models/expense.model';
import { Category } from '../models/category.model';
import { Bank } from '../models/bank.model';

@Component({
  selector: 'app-expenses-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './expenses-list.html',
  styleUrl: './expenses-list.css',
})
export class ExpensesList implements OnInit {
  private databaseService = inject(DatabaseService);

  expenses = signal<Expense[]>([]);
  categories = signal<Map<number, string>>(new Map());
  banks = signal<Map<number, string>>(new Map());
  selectedExpenses = signal<Set<number>>(new Set());

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

  toggleSelection(id: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const currentSelected = new Set(this.selectedExpenses());

    if (isChecked) {
      currentSelected.add(id);
    } else {
      currentSelected.delete(id);
    }

    this.selectedExpenses.set(currentSelected);
  }

  toggleAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      const allIds = this.expenses()
        .map(e => e.id)
        .filter((id): id is number => id !== undefined);
      this.selectedExpenses.set(new Set(allIds));
    } else {
      this.selectedExpenses.set(new Set());
    }
  }

  isAllSelected(): boolean {
    const currentExpenses = this.expenses();
    return currentExpenses.length > 0 &&
      this.selectedExpenses().size === currentExpenses.length;
  }

  async deleteSelected() {
    const selected = this.selectedExpenses();
    if (selected.size === 0) return;

    if (window.confirm(`Czy na pewno chcesz usunąć wybrane wydatki (${selected.size})?`)) {
      for (const id of selected) {
        await this.databaseService.deleteExpense(id);
      }
      this.selectedExpenses.set(new Set());
      await this.loadData();
    }
  }
}
