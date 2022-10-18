export class ShoppingListItem {
  constructor(
    public id: number,
    public description: string,
    public amount: number
  ) {
    this.id = id;
    this.description = description;
    this.amount = isNaN(amount) ? 1 : amount;
  }
}
