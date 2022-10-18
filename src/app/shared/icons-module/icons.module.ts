import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  declarations: [],
  imports: [CommonModule, FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class IconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTrashAlt, faCheck, faPlus, faDeleteLeft);
  }
}
