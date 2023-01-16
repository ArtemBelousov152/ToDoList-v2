import { state } from './enums'
import { ITusk } from './task';

export interface IBoardItem {
    id: string;
    state: state;
    items: ITusk[];
}