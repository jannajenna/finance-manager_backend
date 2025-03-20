import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Entry } from 'src/entries/entities/entry.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  //Relationship one to many
  @OneToMany(() => Entry, (entry) => entry.category)
  entries: Entry[];
}
