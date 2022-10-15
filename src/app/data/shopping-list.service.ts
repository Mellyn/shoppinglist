import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShoppingListStoreService } from './shopping-list-store.service';
import { ShoppingListItem } from '../data/shoppinglist.model';

/**
 * ShoppingListService
 * Data Handling (for API Calls)
 * Melanie Lucht
 * 15.10.2022
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
    const list: ShoppingListItem[] = [
      {
        id: 1,
        description: 'Brötchen',
        amount: 4,
      },
    ];

    this.store.load(list);
  }

  public add(newItem: ShoppingListItem) {
    this.store.add(newItem);
  }

  public edit(editItem: ShoppingListItem) {
    this.store.edit(editItem);
  }

  public delete(deleteItem: ShoppingListItem) {
    this.store.delete(deleteItem.id);
  }
}
