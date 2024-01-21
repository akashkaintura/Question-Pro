// src/order/order.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '../entities/order.entity';
import { CreateOrderDTO, UpdateOrderDTO } from '../DTO/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Get all orders
  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  // Create a new order
  @Post()
  async createOrder(@Body() createOrderDTO: CreateOrderDTO): Promise<Order> {
    return this.orderService.createOrder(createOrderDTO.groceryItemIds);
  }

  // Get a specific order by ID
  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<Order> {
    return this.orderService.getOrderById(id);
  }

  // Update an order
  @Put(':id')
  async updateOrder(
    @Param('id') id: number,
    @Body() updateOrderDTO: UpdateOrderDTO,
  ): Promise<Order> {
    return this.orderService.updateOrder(id, updateOrderDTO);
  }

  // Delete an order
  @Delete(':id')
  async deleteOrder(@Param('id') id: number): Promise<void> {
    return this.orderService.deleteOrder(id);
  }
}
