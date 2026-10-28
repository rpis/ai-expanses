import { TestBed } from '@angular/core/testing';
import 'fake-indexeddb/auto';
import { DatabaseService } from './database';

describe('Database', () => {
  let service: DatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
