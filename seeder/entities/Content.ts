import { Entity, PrimaryColumn, Column, ManyToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class Content {
  @PrimaryColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar" })
  title!: string;

  @Column({ type: "text" })
  overview!: string;

  @Column({ type: "varchar", nullable: true })
  release_date!: string;

  @Column({ type: "varchar" })
  poster_path!: string;

  @Column({ type: "float" })
  vote_average!: number;

  @Column({ type: "varchar" })
  content_type!: string;

  @Column({ type: "varchar", nullable: true })
  trailer_url!: string;

  @ManyToMany(() => User, (user) => user.favorites)
  users!: User[];
}
