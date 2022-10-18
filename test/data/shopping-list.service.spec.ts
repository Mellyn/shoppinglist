import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ShoppingListStoreService } from '../../src/app/data/shopping-list-store.service';
import { ShoppingListService } from '../../src/app/data/shopping-list.service';
import { ShoppingListItem } from '../../src/app/data/shoppinglist.model';

// test if store-service functions are called
// init, add, edit and delete

describe('ShoppingListService', () => {
  let service: ShoppingListService;

  let mockItem: ShoppingListItem;

  let storeMock = {
    load: () => of([]),
    add: () => of([]),
    edit: () => of([]),
    delete: () => of([]),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ShoppingListStoreService,
          useValue: storeMock,
        },
      ],
    });

    mockItem = {
      id: 1,
      description: 'TestItem1',
      amount: 3,
    };

    jest.spyOn(storeMock, 'load');
    jest.spyOn(storeMock, 'add');
    jest.spyOn(storeMock, 'edit');
    jest.spyOn(storeMock, 'delete');

    service = TestBed.inject(ShoppingListService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should load data on init', () => {
    expect(storeMock.load).toHaveBeenCalledTimes(1);
  });

  test('should call add method on store', () => {
    service.add(mockItem);
    expect(storeMock.add).toHaveBeenCalledTimes(1);
  });

  test('should call edit method on store', () => {
    service.edit(mockItem);
    expect(storeMock.edit).toHaveBeenCalledTimes(1);
  });

  test('should call delete method on store', () => {
    service.delete(mockItem);
    expect(storeMock.delete).toHaveBeenCalledTimes(1);
  });
});
