/* istanbul ignore file */
import { BehaviorSubject } from 'rxjs';
import { ShoppingListItem } from 'src/app/data/shoppinglist.model';

export class MockShoppingListService {
  private _shoppingList$ = new BehaviorSubject<ShoppingListItem[]>([]);
  public get shoppingList$() {
    return this._shoppingList$;
  }

  add(items: ShoppingListItem[]) {
    this._shoppingList$ = new BehaviorSubject<ShoppingListItem[]>([]);
  }
  edit(newItem: ShoppingListItem) {
    this._shoppingList$ = new BehaviorSubject<ShoppingListItem[]>([]);
  }
  delete(itemId: number) {
    this._shoppingList$ = new BehaviorSubject<ShoppingListItem[]>([]);
  }
}
