import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseForm } from './expense-form';
import { DatabaseService } from '../database/database';
import { provideRouter } from '@angular/router';

describe('ExpenseForm', () => {
  let component: ExpenseForm;
  let fixture: ComponentFixture<ExpenseForm>;

  beforeEach(async () => {
    const mockDbService = {
      getCategories: vi.fn().mockResolvedValue([]),
      getBanks: vi.fn().mockResolvedValue([])
    };

    await TestBed.configureTestingModule({
      imports: [ExpenseForm],
      providers: [
        provideRouter([]),
        { provide: DatabaseService, useValue: mockDbService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
