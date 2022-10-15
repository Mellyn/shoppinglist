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
}
