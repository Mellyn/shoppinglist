import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingListComponent } from '../../../src/app/sites/shopping-list/shopping-list.component';
import { ShoppingListService } from '../../../src/app/data/shopping-list.service';
import { MockShoppingListService } from '../../mocks/shopping-list.service.mock';
import { IconsModule } from '../../../src/app/shared/icons-module/icons.module';
import { By } from '@angular/platform-browser';
import { ShoppingListItem } from 'src/app/data/shoppinglist.model';

describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;
  let shoppingListService: ShoppingListService;
  let mockItem: ShoppingListItem;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingListComponent],
      providers: [
        {
          provide: ShoppingListService,
          useClass: MockShoppingListService,
        },
      ],
      imports: [ReactiveFormsModule, IconsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
    shoppingListService = TestBed.inject(ShoppingListService);

    mockItem = {
      id: 1,
      description: 'TestItem1',
      amount: 3,
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should init shoppingList Subject', () => {
    fixture.detectChanges();
    expect(component.shoppingList$).toBe(shoppingListService.shoppingList$);
  });

  test('should call onClear on ButtonClick', fakeAsync(() => {
    jest.spyOn(component, 'onClear');
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(
      By.css('[data-testid="btn-clear"]')
    ).nativeElement;

    clearButton.click();
    tick();
    expect(component.onClear).toHaveBeenCalled();
  }));

  test('should call onAdd on AddButton', fakeAsync(() => {
    jest.spyOn(component, 'onAdd');

    component.editMode = false;
    fixture.detectChanges();

    const addButton = fixture.debugElement.query(
      By.css('[data-testid="btn-add"]')
    ).nativeElement;

    addButton.click();
    tick();
    expect(component.onAdd).toHaveBeenCalled();
  }));

  test('should call onEdit if editMode=true', fakeAsync(() => {
    jest.spyOn(component, 'onEdit');

    component.editMode = true;
    fixture.detectChanges();

    const editButton = fixture.debugElement.query(
      By.css('[data-testid="btn-edit"]')
    ).nativeElement;

    editButton.click();
    tick();
    expect(component.onEdit).toHaveBeenCalled();
  }));

  test('should setValue in ListForm', () => {
    component.onClickItem(mockItem);

    expect(component.listForm.value).toStrictEqual({
      id: 1,
      description: 'TestItem1',
      amount: 3,
    });
  });

  test('should call delete in shoppingListService', () => {
    jest.spyOn(shoppingListService, 'delete');
    component.onDelete(mockItem);

    expect(shoppingListService.delete).toHaveBeenCalledTimes(1);
  });

  test('should not call delete in shoppingListService', () => {
    jest.spyOn(shoppingListService, 'delete');

    let mockItemFalse = {
      id: -1,
      description: 'TestItem1',
      amount: 3,
    };
    component.onDelete(mockItemFalse);

    expect(shoppingListService.delete).toBeCalledTimes(0);
  });

  test('should call save in shoppingListService', () => {
    jest.spyOn(shoppingListService, 'edit');

    component.listForm.setValue(mockItem);
    component.onEdit();

    expect(shoppingListService.edit).toHaveBeenCalledTimes(1);
  });

  test('should call add in shoppingListService', () => {
    jest.spyOn(shoppingListService, 'add');

    component.listForm.setValue(mockItem);
    component.onAdd();

    expect(shoppingListService.add).toHaveBeenCalledTimes(1);
  });

  test('should not save when description empty', () => {
    jest.spyOn(shoppingListService, 'add');
    let mockItemFalse = {
      id: 1,
      description: '',
      amount: 3,
    };

    component.listForm.setValue(mockItemFalse);
    component.onAdd();

    expect(shoppingListService.add).toHaveBeenCalledTimes(0);
  });

  test('should not save when amount 0', () => {
    jest.spyOn(shoppingListService, 'add');
    let mockItemFalse = {
      id: 1,
      description: 'Zeitung',
      amount: 0,
    };

    component.listForm.setValue(mockItemFalse);
    component.onAdd();

    expect(shoppingListService.add).toHaveBeenCalledTimes(0);
  });
});
