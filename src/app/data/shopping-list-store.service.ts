import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShoppingListItem } from '../data/shoppinglist.model';

enum ACTIONS {
  LOAD,
  ADD,
  EDIT,
  DELETE,
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingListStoreService {
  private shoppingList: ShoppingListItem[] = [];
  shoppingList$ = new BehaviorSubject<ShoppingListItem[]>([]);

  // Actions on shoppingList (get a copy of list)

  public load(items: ShoppingListItem[]) {
    this.shoppingList = [...items];
    this.shoppingList$.next(this.shoppingList);
  }

  public add(newItem: ShoppingListItem) {
    this.shoppingList = [...this.shoppingList, newItem];
    this.shoppingList$.next(this.shoppingList);
  }

  public edit(editedItem: ShoppingListItem) {
    this.shoppingList = this.shoppingList.map((listItem) => {
      if (listItem.id !== editedItem.id) {
        return listItem;
      } else {
        return editedItem;
      }
    });
    this.shoppingList$.next(this.shoppingList);
  }

  public delete(itemId: number) {
    this.shoppingList = this.shoppingList.filter((item) => {
      return item.id !== itemId;
    });
    this.shoppingList$.next(this.shoppingList);
  }

  public getNewId(): number {
    if (this.shoppingList.length == 0) {
      return 1;
    }

    const ids = this.shoppingList.map((obj) => obj.id);
    let max = Math.max(...ids);
    return max + 1;
  }
}
