import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../../categories/entities/category.entity'; // Import Category entity to create relation

@Entity()
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  amount: number;

  // Relationship many to one
  // Setting nullable: false means an entry must have a category.
  @ManyToOne(() => Category, (category) => category.entries, {
    nullable: false,
  })
  category: Category;
}
