import { TestBed } from '@angular/core/testing';
import { ShoppingListStoreService } from './shopping-list-store.service';
import { skip } from 'rxjs';

describe('ShoppingListStoreService', () => {
  let service: ShoppingListStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingListStoreService);
  });
  test('should load ShoppingListItems', (done) => {
    const mockData = [
      {
        id: 1,
        description: 'TestItem1',
        amount: 3,
      },
    ];
    // skip empty
    const list$ = service.shoppingList$.pipe(skip(1));
    list$.subscribe((data) => {
      try {
        expect(data).toEqual([{ id: 1, description: 'TestItem1', amount: 3 }]);
        done();
      } catch (error) {
        done(error);
      }
    });
    service.load(mockData);
  });

  test('should add a ShoppingListItem', (done) => {
    const mockData = {
      id: 1,
      description: 'TestItem1',
      amount: 3,
    };
    // skip empty
    const list$ = service.shoppingList$.pipe(skip(1));
    list$.subscribe((data) => {
      try {
        expect(data).toEqual([{ id: 1, description: 'TestItem1', amount: 3 }]);
        done();
      } catch (error) {
        done(error);
      }
    });
    service.add(mockData);
  });

  test('should edit a ShoppingListItem', (done) => {
    const mockData = {
      id: 1,
      description: 'TestItem1',
      amount: 3,
    };
    // skip empty and adding
    const list$ = service.shoppingList$.pipe(skip(2));
    list$.subscribe((data) => {
      try {
        expect(data).toEqual([
          { id: 1, description: 'TestItemChanged', amount: 3 },
        ]);
        done();
      } catch (error) {
        done(error);
      }
    });
    service.add(mockData);

    const changedMockData = {
      id: 1,
      description: 'TestItemChanged',
      amount: 3,
    };
    service.edit(changedMockData);
  });

  test('should delete a ShoppingListItem', (done) => {
    const mockData = [
      {
        id: 1,
        description: 'TestItem1',
        amount: 3,
      },
      {
        id: 2,
        description: 'TestItem2',
        amount: 4,
      },
    ];
    // skip empty and loading
    const list$ = service.shoppingList$.pipe(skip(2));
    list$.subscribe((data) => {
      console.log(data);
      try {
        expect(data).toEqual([
          {
            id: 2,
            description: 'TestItem2',
            amount: 4,
          },
        ]);
        done();
      } catch (error) {
        done(error);
      }
    });
    service.load(mockData);
    service.delete(1);
  });

  test('should create new id if empty', (done) => {
    const list$ = service.shoppingList$.pipe(skip(2));
    list$.subscribe();
    const newId = service.getNewId();
    expect(newId).toBe(1);
    done();
  });

  test('should create new id', (done) => {
    const mockData = {
      id: 1,
      description: 'TestItem1',
      amount: 3,
    };
    const list$ = service.shoppingList$.pipe(skip(2));
    list$.subscribe();
    service.add(mockData);
    const newId = service.getNewId();
    expect(newId).toBe(2);
    done();
  });
});
