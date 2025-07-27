import { Exclude } from "class-transformer";
import { Category } from "src/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    productname: string;
    @Column()
    price: number;
    @Column({ nullable: true })
    image: string;
    @Column({ nullable: true })
    discount: number;
    @Column({ nullable: true })
    @Exclude()
    categoryId: number;

    @ManyToOne(() => Category, (category) => category.products, { eager: true })
    @JoinColumn({
        name: 'categoryId',
        referencedColumnName: 'id'
    })
    category: Category;
}
