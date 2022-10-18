import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ShoppingListComponent } from './shopping-list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { IconsModule } from 'src/app/shared/icons-module/icons.module';

@NgModule({
  declarations: [ShoppingListComponent, ListItemComponent],
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
  ],
})
export class ShoppingListModule {}
