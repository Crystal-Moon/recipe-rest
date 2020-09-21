import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Recipe } from './Recipe';

@Entity()
export class Ingredient {

	@PrimaryGeneratedColumn()
	id = undefined;

	@Column({
        type: 'varchar',
        length: 10,
    })
	cant = '';

	@Column({
        type: 'varchar',
        nullable: false,
        length: 50,
    })
	name = '';

	@ManyToOne(type => Recipe, recipe => recipe.id)
	recipe = undefined;

}