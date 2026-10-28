import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesList } from './expenses-list';
import { DatabaseService } from '../database/database';
import { vi } from 'vitest';

describe('ExpensesList', () => {
  let component: ExpensesList;
  let fixture: ComponentFixture<ExpensesList>;

  beforeEach(async () => {
    const mockDbService = {
      getExpenses: vi.fn().mockResolvedValue([]),
      getCategories: vi.fn().mockResolvedValue([]),
      getBanks: vi.fn().mockResolvedValue([])
    };

    await TestBed.configureTestingModule({
      imports: [ExpensesList],
      providers: [
        { provide: DatabaseService, useValue: mockDbService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
