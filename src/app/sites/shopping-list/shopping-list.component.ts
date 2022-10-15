import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ShoppingListItem } from '../../data/shoppinglist.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup } from '@angular/forms';
import { ShoppingListService } from '../../data/shopping-list.service';

interface ShoppingListForm {
  id: FormControl<number | null>;
  description: FormControl<string | null>;
  amount: FormControl<number | null>;
}

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingList: ShoppingListItem[] = [];
  shoppingList$: Observable<ShoppingListItem[]> | undefined;
  shoppingListSub: Subscription | undefined;

  editMode: boolean;
  message: string;

  listForm: FormGroup;

  constructor(private shoppingListService: ShoppingListService) {
    this.listForm = new FormGroup<ShoppingListForm>({
      id: new FormControl(null),
      description: new FormControl(''),
      amount: new FormControl(1),
    });

    this.message = '';
    this.editMode = false;
  }

  ngOnInit(): void {
    this.shoppingList$ = this.shoppingListService.shoppingList$;

    this.shoppingListSub = this.shoppingList$.subscribe({
      next: (listItems) => {
        console.log('List Changed', listItems);
        this.shoppingList = listItems;
      },
      error: (error) => {
        console.log('Error in ShoppingList:', error);
      },
    });
  }
  ngOnDestroy(): void {
    this.shoppingListSub?.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.shoppingList, event.previousIndex, event.currentIndex);
  }

  onClickItem(item: ShoppingListItem) {
    console.log('CLICKED', item);
    this.message = '';
    this.listForm.setValue({
      id: item.id,
      description: item.description,
      amount: item.amount,
    });
    this.editMode = true;
  }

  onClear() {
    console.log('CLEAR');
    this.editMode = false;
    this.message = '';
    this.listForm.setValue({
      id: 0,
      description: '',
      amount: '',
    });
  }

  onAdd() {
    this.save({ type: 'new' });
  }

  onEdit() {
    this.save({ type: 'edit' });
  }

  onDelete(item: ShoppingListItem) {
    if (!item.id || item.id < 1) {
      this.message = 'Position konnte nicht gelöscht werden.';
      return;
    }
    console.log('Delete', item);
    this.message = '';
    this.shoppingListService.delete(item);
  }

  private save(type: { type: string }) {
    const formValue: ShoppingListItem = this.listForm.value;
    if (this.checkValidation(formValue)) {
      if (type.type === 'edit') {
        console.log('Edit');
        this.shoppingListService.edit(formValue);
      } else {
        console.log('Add', formValue);
        this.shoppingListService.add(formValue);
      }
      this.message = '';
      this.onClear();
    }
  }

  private checkValidation(formValue: ShoppingListItem): boolean {
    let returnValue = true;
    if (formValue.amount < 1 || formValue.description === '') {
      this.message = 'Bitte mindestens eine Position eintragen.';
      returnValue = false;
    }
    return returnValue;
  }
}
