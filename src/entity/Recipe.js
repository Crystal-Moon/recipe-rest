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

    @OneToMany(type => Ingredient, ingredient => ingredient.recipe, { cascade: true, onDelete: 'CASCADE', eager: true })
    ingredients = undefined;

    @ManyToOne(type => User, user=>user.id, { eager: true })
    author = undefined;

    @ManyToOne(type => Category, { eager: true })
    category = undefined;

}
