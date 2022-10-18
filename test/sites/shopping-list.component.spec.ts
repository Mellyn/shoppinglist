import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingListComponent } from '../../src/app/sites/shopping-list/shopping-list.component';
import { ShoppingListService } from '../../src/app/data/shopping-list.service';
import { MockShoppingListService } from './../mocks/shopping-list.service.mock';
import { IconsModule } from '../../src/app/shared/icons-module/icons.module';
import { By } from '@angular/platform-browser';

describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;
  let shoppingListService: ShoppingListService;

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
  });

  test('should init shoppingList Subject', () => {
    fixture.detectChanges();
    expect(component.shoppingList$).toBe(shoppingListService.shoppingList$);
  });

  test('should call onClear on ButtonClick', fakeAsync(() => {
    jest.spyOn(component, 'onClear');
    fixture.detectChanges();

    // let clearButton = fixture.nativeElement.querySelector('.clearButton');
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

    // let clearButton = fixture.nativeElement.querySelector('.addButton');
    addButton.click();
    tick();
    expect(component.onAdd).toHaveBeenCalled();
  }));

  test('should call onEdit if EditMode', fakeAsync(() => {
    jest.spyOn(component, 'onEdit');

    component.editMode = true;
    fixture.detectChanges();

    const editButton = fixture.debugElement.query(
      By.css('[data-testid="btn-edit"]')
    ).nativeElement;

    //let clearButton = fixture.nativeElement.querySelector('.editButton');
    editButton.click();
    tick();
    expect(component.onEdit).toHaveBeenCalled();
  }));
});
