import 'fake-indexeddb/auto';
import { indexedDB, IDBKeyRange } from 'fake-indexeddb';

if (typeof globalThis !== 'undefined') {
  globalThis.indexedDB = indexedDB;
  globalThis.IDBKeyRange = IDBKeyRange;
}
if (typeof window !== 'undefined') {
  window.indexedDB = indexedDB;
  window.IDBKeyRange = IDBKeyRange;
}
