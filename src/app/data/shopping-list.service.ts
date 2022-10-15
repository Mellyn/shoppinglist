import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShoppingListStoreService } from './shopping-list-store.service';
import { ShoppingListItem } from '../data/shoppinglist.model';

/**
 * ShoppingListService
 * Data Handling - later API Calls
 */

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private _shoppingList$ = new BehaviorSubject<ShoppingListItem[]>([]);
  public get shoppingList$() {
    return this._shoppingList$;
  }

  constructor(private store: ShoppingListStoreService) {
    this._shoppingList$ = this.store.shoppingList$;
    this.loadDefaultData();
  }

  private loadDefaultData() {
    // Here API call (GET)
    const list: ShoppingListItem[] = [
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

    this.store.load(list);
  }

  public add(newItem: ShoppingListItem) {
    newItem.id = this.store.getNewId();
    this.store.add(newItem);
  }

  public edit(editItem: ShoppingListItem) {
    this.store.edit(editItem);
  }

  public delete(deleteItem: ShoppingListItem) {
    this.store.delete(deleteItem.id);
  }
}
