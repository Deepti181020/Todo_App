import { User } from "src/users/entities/user.entity";
import { Entity,Column,PrimaryGeneratedColumn, ManyToOne } from "typeorm";
@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    date:string;

    @Column()
    Completed:boolean;

    @ManyToOne (()=> User , (user)=> user.todo)
    user : User;
}
