import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Content } from "./Content";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn({ name: "user_id", type: "bigint" })
  user_id: number;

  @Column({ type: "varchar", length: 20 })
  first_name: string;

  @Column({ type: "varchar", length: 20 })
  last_name: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @ManyToMany(() => Content, (content) => content.users)
  @JoinTable({
    name: "favorites",
    joinColumn: { name: "user_id", referencedColumnName: "user_id" },
    inverseJoinColumn: { name: "content_id", referencedColumnName: "id" },
  })
  favorites: Content[];
}