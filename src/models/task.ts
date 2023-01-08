import { priority, state, status } from "./enums";


export interface ITusk {
    title: string;
    id: string;
    number: number;
    startDate: string;
    endDate: string;
    timeInWork: number;
    priority: priority
    status: status;
    descr: string;
    state: state;
}