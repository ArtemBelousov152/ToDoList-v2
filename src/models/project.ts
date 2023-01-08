import { ITusk } from "./task";
import { status } from "./enums";

export interface IProject {
    title: string;
    tasks: ITusk[];
    id: string;
    status: status
} 