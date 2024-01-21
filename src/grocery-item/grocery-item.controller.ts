// src/grocery/grocery.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { GroceryService } from '../grocery-item/grocery-item.service';
import { GroceryItem } from '../entities/grocery-item.entity';
import { GroceryItemDTO, UpdateGroceryItemDTO } from '../DTO/grocery-item.dto';

@Controller('grocery')
export class GroceryController {
  constructor(private readonly groceryService: GroceryService) {}

  // Get all grocery items
  @Get()
  async getAllGroceryItems(): Promise<GroceryItem[]> {
    return this.groceryService.getAllGroceryItems();
  }

  // Add a new grocery item
  @Post()
  async addGroceryItem(
    @Body() groceryItemDTO: GroceryItemDTO,
  ): Promise<GroceryItem> {
    const { name, price, inventory } = groceryItemDTO;
    const newGroceryItem: GroceryItem = {
      name,
      price,
      inventory,
      id: 0,
      orders: undefined,
    };
    return this.groceryService.addGroceryItem(newGroceryItem);
  }

  // Update details of an existing grocery item
  @Put(':id')
  async updateGroceryItem(
    @Param('id') id: number,
    @Body() updateGroceryItemDTO: UpdateGroceryItemDTO,
  ): Promise<GroceryItem> {
    return this.groceryService.updateGroceryItem(id, updateGroceryItemDTO);
  }

  // Remove a grocery item
  @Delete(':id')
  async removeGroceryItem(@Param('id') id: number): Promise<void> {
    return this.groceryService.removeGroceryItem(id);
  }
}
