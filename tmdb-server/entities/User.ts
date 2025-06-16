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

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Content, (content) => content.users)
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

  static createUser(
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ): User {
    const user = new User();
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.password = password;

    return user;
  }
}
