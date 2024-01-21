import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { GroceryItem } from './grocery-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => GroceryItem, (groceryItem) => groceryItem.orders)
  groceryItems: GroceryItem[];

  @ManyToOne(() => GroceryItem, (groceryItem) => groceryItem.orders)
  @JoinColumn({ name: 'groceryItemId' })
  groceryItem: GroceryItem;

  @Column()
  quantity: number;
}
