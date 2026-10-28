import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database/database';
import { Category } from '../models/category.model';
import { Bank } from '../models/bank.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule
  ],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css',
})
export class ExpenseForm implements OnInit {
  private databaseService = inject(DatabaseService);
  private router = inject(Router);

  categories: Category[] = [];
  banks: Bank[] = [];

  date: Date = new Date();
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
      date: this.date.toISOString(),
      amount: this.amount,
      categoryId: this.categoryId,
      bankId: this.bankId,
      notes: this.notes
    });

    this.router.navigate(['/']);
  }
}
