import { Entity, PrimaryColumn, Column, ManyToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class Content {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column("text")
  overview: string;

  @Column({ nullable: true })
  release_date: string;

  @Column()
  poster_path: string;

  @Column("float")
  vote_average: number;

  @Column()
  content_type: string;

  @Column({ nullable: true })
  trailer_url: string;

  @ManyToMany(() => User, (user) => user.favorites)
  users: User[];
}
