import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
