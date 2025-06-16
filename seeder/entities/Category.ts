import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Category {
  @PrimaryColumn({ type: "bigint" })
  id!: number;

  @Column({ type: "varchar" })
  category_type!: string;
}
