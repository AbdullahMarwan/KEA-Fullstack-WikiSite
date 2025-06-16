import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "people" })
export class People {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id!: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  name!: string;

  @Column({ name: "known_for", type: "varchar", length: 100, nullable: true })
  known_for!: string;

  @Column({ type: "tinyint", nullable: true })
  gender!: number;

  // Changed from timestamp to date to support older dates
  @Column({ type: "date", nullable: true })
  birthday!: Date | null;

  @Column({ type: "varchar", nullable: true })
  profile_path!: string | null;

  @Column({ type: "varchar", length: 200, nullable: true })
  biography!: string;
}
