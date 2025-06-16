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
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Content)
  @JoinTable({
    name: "favorites",
    joinColumn: {
      name: "userId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "contentId",
      referencedColumnName: "id",
    },
  })
  favorites: Content[];
}
