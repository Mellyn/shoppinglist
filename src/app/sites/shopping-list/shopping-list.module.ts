import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';

import {
  faCheck,
  faTrashAlt,
  faPlus,
  faDeleteLeft,
} from '@fortawesome/free-solid-svg-icons';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  declarations: [ShoppingListComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ShoppingListModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTrashAlt, faCheck, faPlus, faDeleteLeft);
  }
}
