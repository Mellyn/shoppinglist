import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [ShoppingListComponent],
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule],
})
export class ShoppingListModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTrashAlt, faCheck, faPlus, faDeleteLeft);
  }
}
