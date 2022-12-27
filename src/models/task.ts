export enum priority {
    IMPORTANT = "Важно",
    URGENTLY = "Срочно",
    OPTIONAL = "Необязательно"
}

export enum status {
    DONE = "Выполнен",
    INPROGRESS = "В работе",
    FAILD = "Провалено"
}

export enum state {
    QUEUE = "Queue",
    DEVELOPMENT = 'Development',
    DONE = 'Done'
}

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