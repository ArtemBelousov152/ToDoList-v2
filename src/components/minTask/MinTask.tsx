import Status from '../status/Status';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { FC } from 'react';
import { todoSlice } from '../../store/reducers/todoSlice';

import './minTask.scss';

interface IPropsMinTask {
    number: number
    title: string
    descr: string
    priority: string
    startDate: string
    timeInWork: number
    id: string
    projectId: string | undefined
}

const MinTask:FC<IPropsMinTask> = ({number, descr, priority, startDate, timeInWork, title, id, projectId}) => {
    const dispatch = useAppDispatch();
    const {delTask} = todoSlice.actions

    return (
        <li className="minTask">
            <div className="minTask__header">
                <div className="minTask__number">№{number}</div>
                <h2 className="minTask__header">{title}</h2>
                <Status min={true}/>
            </div>
            <div className="minTask__descr">
                {descr}
            </div>
            <div className="minTask__priority">
                Приоритет: <span>{priority}</span>
            </div>
            <div className="minTask__create">
                Дата создания: {startDate}
            </div>
            <div className="minTask__workTime">
                Время в работе: {timeInWork} часов
            </div>
            <div className="minTask__footer">
                <button 
                    className="minTask__del"
                    onClick={() => {dispatch(delTask({taskId: id, projectId: projectId}))}}>Удалить задачу</button>
                <button className="minTask__about">Подробнее</button>
            </div>
        </li>
  )
}

export default MinTask