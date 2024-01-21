export class GroceryItemDTO {
  name: string;
  price: number;
  inventory: number;
}

export class UpdateGroceryItemDTO {
  name?: string;
  price?: number;
  inventory?: number;
}
