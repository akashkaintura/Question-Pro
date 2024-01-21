import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { GroceryItem } from '../entities/grocery-item.entity';
import { UpdateOrderDTO } from '../DTO/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(GroceryItem)
    private groceryRepository: Repository<GroceryItem>,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['groceryItems'] });
  }

  async createOrder(groceryItemIds: number[]): Promise<Order> {
    const groceryItems = await this.groceryRepository.findByIds(groceryItemIds);

    if (groceryItems.length !== groceryItemIds.length) {
      throw new NotFoundException('One or more grocery items not found');
    }

    const order = new Order();
    order.groceryItems = groceryItems;

    return this.orderRepository.save(order);
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.groceryItems', 'groceryItem')
      .where('order.id = :id', { id })
      .getOne();

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async updateOrder(id: number): Promise<Order> {
    const existingOrder = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.groceryItems', 'groceryItem')
      .where('order.id = :id', { id })
      .getOne();

    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Save the updated order
    return this.orderRepository.save(existingOrder);
  }

  async deleteOrder(id: number): Promise<void> {
    const order = await this.orderRepository.findOne(id);

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    await this.orderRepository.remove(order);
  }
}
