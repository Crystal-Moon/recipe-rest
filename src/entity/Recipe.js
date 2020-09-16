import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Ingredient } from './Ingredient';
import { Category } from './Category';

@Entity()
export class Recipe {

	@PrimaryGeneratedColumn()
    id = undefined;

    @Column({
        type: 'varchar',
        length: 50,
    })
    name = '';

    @OneToMany(type => Ingredient, ingredient => ingredient.recipe, { cascade: true, onDelete: 'CASCADE' })
    ingredients;// = Ingredient[];

    @ManyToOne(type => User, user=>user.id)
    author;

    @ManyToOne(type => Category)
    category; //Category;

}
