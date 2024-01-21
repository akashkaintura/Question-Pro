// src/grocery/grocery.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroceryItem } from '../entities/grocery-item.entity';
import { UpdateGroceryItemDTO } from '../DTO/grocery-item.dto';

@Injectable()
export class GroceryService {
  constructor(
    @InjectRepository(GroceryItem)
    private groceryRepository: Repository<GroceryItem>,
  ) {}

  async getAllGroceryItems(): Promise<GroceryItem[]> {
    return this.groceryRepository.find();
  }

  async addGroceryItem(groceryItem: GroceryItem): Promise<GroceryItem> {
    return this.groceryRepository.save(groceryItem);
  }

  async updateGroceryItem(
    id: number,
    updatedGroceryItemDTO: UpdateGroceryItemDTO,
  ): Promise<GroceryItem> {
    const existingGroceryItem = await this.groceryRepository.findOne(id);

    if (!existingGroceryItem) {
      throw new NotFoundException(`Grocery item with ID ${id} not found`);
    }

    // Update properties of the existing item based on the DTO
    if (updatedGroceryItemDTO.name) {
      existingGroceryItem.name = updatedGroceryItemDTO.name;
    }

    if (updatedGroceryItemDTO.price) {
      existingGroceryItem.price = updatedGroceryItemDTO.price;
    }

    if (updatedGroceryItemDTO.inventory) {
      existingGroceryItem.inventory = updatedGroceryItemDTO.inventory;
    }

    return this.groceryRepository.save(existingGroceryItem);
  }

  async removeGroceryItem(id: number): Promise<void> {
    const groceryItem = await this.groceryRepository.findOne({ id });

    if (!groceryItem) {
      throw new NotFoundException(`Grocery item with ID ${id} not found`);
    }

    await this.groceryRepository.remove(groceryItem);
  }
}
