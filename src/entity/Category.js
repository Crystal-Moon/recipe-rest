import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User'

@Entity()
export class Category {

	@PrimaryGeneratedColumn()
	id = undefined;

	@Column({
        type: 'varchar',
        nullable: false,
        length: 50,
    })
	name = '';

	@ManyToOne(type => User, user=>user.id, { eager: true })
    author = undefined;
	
	@Column({
        type: 'boolean',
        default: false
    })
    is_erase = false;

}