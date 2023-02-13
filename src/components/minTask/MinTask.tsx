import Status from '../status/Status';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { FC, useEffect } from 'react';
import { todoSlice } from '../../store/reducers/todoSlice';
import classNames from 'classnames';

import './minTask.scss';
import { status } from '../../models/enums';

interface IPropsMinTask {
    number: number
    title: string
    descr: string
    priority: string
    startDate: string
    timeInWork: number
    id: string
    status: status
}

const MinTask: FC<IPropsMinTask> = ({ number, descr, priority, startDate, timeInWork, title, id, status }) => {
    const dispatch = useAppDispatch();
    const { modalTodoIsOpen } = useAppSelector(state => state.todoReducer);
    const { delTask, openModalTodo, setActiveTask, timeInWorkChange } = todoSlice.actions;

    const aboutTask = () => {
        dispatch(setActiveTask(id))
        dispatch(openModalTodo())
    }

    useEffect(() => {
        dispatch(timeInWorkChange(id));
        const checkTime = setInterval(() => {
            dispatch(timeInWorkChange(id));
        }, 10000)

        return () => {
            clearInterval(checkTime);
        };
    }, [])

    const disabledClass = classNames({
        'minTask_disabled': modalTodoIsOpen
    })

    return (
        <li className={`minTask ${disabledClass}`}>
            <div className="minTask__header">
                <div className="minTask__number">№{number}</div>
                <h2 className="minTask__header">{title}</h2>
                <Status min={true} position={status} />
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
                Время в работе: {timeInWork} дней
            </div>
            <div className="minTask__footer">
                <button
                    className="minTask__del"
                    onClick={() => { dispatch(delTask(id)) }}>Удалить задачу</button>
                <button
                    className="minTask__about"
                    onClick={aboutTask}
                >
                    Подробнее</button>
            </div>
        </li>
    )
}

export default MinTask