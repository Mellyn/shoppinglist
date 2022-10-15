export class ShoppingListItem {
  public id: number;
  public description: string;
  public amount: number;
  constructor(id: number, description: string, amount: number) {
    this.id = id;
    this.description = description;
    this.amount = isNaN(amount) ? 1 : amount;
  }
}
