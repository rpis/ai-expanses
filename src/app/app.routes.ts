import { Routes } from '@angular/router';
import { ExpensesList } from './expenses-list/expenses-list';
import { ExpenseForm } from './expense-form/expense-form';

export const routes: Routes = [
  { path: '', component: ExpensesList },
  { path: 'new', component: ExpenseForm }
];
