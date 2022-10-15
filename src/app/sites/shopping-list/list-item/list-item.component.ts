import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ShoppingListItem } from 'src/app/data/shoppinglist.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit, OnChanges {
  @Input() position: ShoppingListItem | undefined;
  @Output() onClicked = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  item: ShoppingListItem | undefined;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes', changes);
    const item: ShoppingListItem = changes['position']['currentValue'];
    this.item = item;
  }

  ngOnInit(): void {}

  onClickItem(item: ShoppingListItem | undefined) {
    this.onClicked.emit(item);
  }

  onDeleteItem(item: ShoppingListItem | undefined) {
    this.onDelete.emit(item);
  }
}
