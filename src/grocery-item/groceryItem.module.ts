// admin.module.ts
import { Module } from '@nestjs/common';
import { GroceryController } from './grocery-item.controller';
import { GroceryService } from './grocery-item.service';

@Module({
  controllers: [GroceryController],
  providers: [GroceryService],
})
export class GroceryModule {}
