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
    @Column()
    image:string;
    @Column()
    discount:number;
    @Column()
    rating:number;

     @Column()
    @Exclude()
    categoryId:number;

    @ManyToOne(()=>Category,(category)=>category.products,{eager:true})
    @JoinColumn({
    name:'categoryId',
    referencedColumnName:'id'
})
    category:Category;
}
