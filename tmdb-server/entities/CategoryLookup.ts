import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Content } from "./Content";
import { Category } from "./Category";

@Entity("category_look_up")
export class CategoryLookup {
  @PrimaryColumn({ name: "Content_id" })
  contentId!: number;

  @PrimaryColumn({ name: "category_id" })
  categoryId!: number;

  @ManyToOne(() => Content, { onDelete: "CASCADE" })
  @JoinColumn({ name: "Content_id" })
  content!: Content;

  @ManyToOne(() => Category, { onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id" })
  category!: Category;
}
