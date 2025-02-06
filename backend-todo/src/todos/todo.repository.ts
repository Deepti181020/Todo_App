import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Todo } from "./entities/todo.entity";

@Injectable()
    export class TodoRepository extends Repository<Todo>{

    }