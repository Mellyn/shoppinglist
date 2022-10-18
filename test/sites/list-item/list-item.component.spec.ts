import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { ListItemComponent } from '../../../src/app/sites/shopping-list/list-item/list-item.component';
import { By } from '@angular/platform-browser';
import { IconsModule } from '../../../src/app/shared/icons-module/icons.module';

// test if functions are called on click
// test if text is changed when ngOnChanges is called

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListItemComponent],
      imports: [IconsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call onDeleteItem on ButtonClick', fakeAsync(() => {
    jest.spyOn(component, 'onDeleteItem');

    let delButton = fixture.nativeElement.querySelector('button');
    delButton.click();
    tick();
    expect(component.onDeleteItem).toHaveBeenCalled();
  }));

  test('should call onClickItem on Row-Click', fakeAsync(() => {
    jest.spyOn(component, 'onClickItem');

    const row = fixture.debugElement.query(
      By.css('[data-testid="description-row"]')
    ).nativeElement;
    row.click();
    tick();
    expect(component.onClickItem).toHaveBeenCalled();
  }));

  test('should set item on Changes', () => {
    const element = fixture.nativeElement;
    let currentValue = { id: 1, description: 'zeitung', amount: 4 };
    component.ngOnChanges({
      position: new SimpleChange(undefined, currentValue, true),
    });
    fixture.detectChanges();
    const text = fixture.debugElement.query(
      By.css('[data-testid="description-text"]')
    ).nativeElement;

    expect(text.textContent).toContain('zeitung');
  });
});
