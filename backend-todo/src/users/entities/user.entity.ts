import { Todo } from "src/todos/entities/todo.entity";
import { Entity,Column,PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;
    
    @Column()
    password: string;

    @Column()
    role: string;

    @Column({ default: true }) 
    isActive: boolean;

    @OneToMany (()=>Todo, (todo)=> todo.user)
    todo: Todo[];

}
