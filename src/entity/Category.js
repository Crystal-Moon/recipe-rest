import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
	
}