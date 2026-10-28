import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database/database';
import { Category } from '../models/category.model';
import { Bank } from '../models/bank.model';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css',
})
export class ExpenseForm implements OnInit {
  private databaseService = inject(DatabaseService);
  private router = inject(Router);

  categories: Category[] = [];
  banks: Bank[] = [];

  date: string = new Date().toISOString().substring(0, 10);
  amount: number | null = null;
  categoryId: number | null = null;
  bankId: number | null = null;
  notes: string = '';

  async ngOnInit() {
    [this.categories, this.banks] = await Promise.all([
      this.databaseService.getCategories(),
      this.databaseService.getBanks()
    ]);
  }

  async saveExpense() {
    if (!this.amount || !this.categoryId || !this.bankId) {
      alert('Wypełnij wymagane pola (Kwota, Kategoria, Bank).');
      return;
    }

    await this.databaseService.addExpense({
      date: new Date(this.date).toISOString(),
      amount: this.amount,
      categoryId: this.categoryId,
      bankId: this.bankId,
      notes: this.notes
    });

    this.router.navigate(['/']);
  }
}
