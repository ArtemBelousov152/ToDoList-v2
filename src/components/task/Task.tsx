import { useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { todoSlice } from '../../store/reducers/todoSlice';
import Status from '../status/Status';

import './task.scss';

const Task = () => {
    const { activeTask } = useAppSelector(state => state.todoReducer);
    const [editDescr, setEditDescr] = useState<boolean>(false);
    const [editDescrValue, setEditDescrValue] = useState<string | undefined>(activeTask?.descr);
    const dispatch = useAppDispatch();
    const { closeModalTodo } = todoSlice.actions;

    if (activeTask === null) {
        return (
            <h2>Что-то пошло не так</h2>
        )
    }

    const closeTask = () => {
        dispatch(closeModalTodo())
    }

    const descrInputChangeValue = (e: FormEvent<HTMLInputElement>) => {
        setEditDescrValue(e.currentTarget.value)
    }

    const renderDescr = () => {

        return (
            editDescr ? <input
                className="task__input"
                value={editDescrValue}
                onChange={descrInputChangeValue} />
                : <div className="task__text">
                    {activeTask.descr}
                </div>
        )
    }

    const renderTask = () => {

        return (
            <div className='task'>
                <div className="task__header">
                    <div className="task__number">№{activeTask.number}</div>
                    <div className="task__created">
                        Дата создания: {activeTask.startDate}
                    </div>
                    <div className="task__end">
                        Дата окончания: {activeTask.endDate}
                    </div>
                    <h2 className="task__name">{activeTask.title}</h2>
                    <div className="task__priority">
                        Приоритет:
                        <br /> <span>{activeTask.priority}</span>
                    </div>
                    <div className="task__workTime">
                        Время в работе:
                        <br /> {activeTask.timeInWork} часов
                    </div>
                    <Status min={true} position={activeTask.status} />
                </div>
                <div className="task__status">
                    Статус выполнения: <span>{activeTask.state}</span>
                </div>
                <div className="task__main">
                    <div className="task__subTasks">
                        <h2>Подзадачи</h2>
                        <hr />
                        <ul className="task__subTacks_list">
                            <li>Подзадача 1</li>
                            <li>Подзадача 2</li>
                            <li>Подзадача 3</li>
                            <button>Подробнее</button>
                        </ul>
                    </div>
                    <div className="task__descr">
                        {renderDescr()}
                        <button className='task__descr_more'>Подробнее</button>
                        <button className='task__comments'>Комментарии</button>
                        <button onClick={closeTask}>Закрыть</button>
                        <button onClick={() => setEditDescr(true)}>Редактировать описание</button>
                    </div>
                    <div className="task__files">
                        <h2>Файлы</h2>
                        <hr />
                        <ul className="task__subTacks_list">
                            <li>Файл 1</li>
                            <li>Файл 2</li>
                            <li>Файл 3</li>
                            <button>Подробнее</button>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {renderTask()}
        </>
    )
}

export default Task