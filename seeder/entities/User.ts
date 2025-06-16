import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Content } from "./Content";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // Add ! to tell TypeScript this will be assigned

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @ManyToMany(() => Content, (content) => content.users)
  @JoinTable({ name: "favorites" })
  favorites!: Content[];
}
