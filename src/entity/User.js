
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {

	@PrimaryGeneratedColumn()
    id = undefined;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 50,
    })
    name = '';

    @Column({
        type: 'varchar',
        nullable: false,
        length: 100,
    })
    email = '';

    @Column({
        type: 'varchar',
        nullable: false,
        length: 250,
    })
    pass = '';

    @Column({
        type: 'varchar',
        nullable: false,
        length: 2,
        default: 'es'
    })
    lang = '';

}