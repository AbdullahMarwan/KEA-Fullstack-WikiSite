import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { User } from "./User";

@Entity("content")
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "text", nullable: true })
  overview: string;

  @Column({ type: "date", nullable: true })
  release_date: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  poster_path: string;

  @Column({ type: "decimal", precision: 3, scale: 1, nullable: true })
  vote_average: number;

  @Column({ type: "varchar", length: 10, nullable: true })
  content_type: string;

  @Column({ nullable: true })
  trailer_url: string;

  @ManyToMany(() => User, (user) => user.favorites)
  users: User[];
}