/* istanbul ignore file */
import { BehaviorSubject } from 'rxjs';
import { ShoppingListItem } from 'src/app/data/shoppinglist.model';

export class MockShoppingListService {
  shoppingList$ = new BehaviorSubject([]);

  add(items: ShoppingListItem[]) {
    this.shoppingList$ = new BehaviorSubject([]);
  }
  edit(newItem: ShoppingListItem) {
    this.shoppingList$ = new BehaviorSubject([]);
  }
  delete(itemId: number) {
    this.shoppingList$ = new BehaviorSubject([]);
  }
}
