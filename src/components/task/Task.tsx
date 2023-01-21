import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { todoSlice } from '../../store/reducers/todoSlice';
import { useState } from 'react';
import DescrEditor from '../descrEditod/DescrEditor';
import Status from '../status/Status';
import classNames from 'classnames';
import Priority from '../priority/Priority';

import './task.scss';

const Task = () => {
    const { activeTask, isDescrEdit } = useAppSelector(state => state.todoReducer);
    const [descrMore, setDescrMore] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { closeModalTodo, openDescrEdit } = todoSlice.actions;


    if (!activeTask) {
        return (
            <h2>Что-то пошло не так</h2>
        )
    }

    const editDescr = () => {
        dispatch(openDescrEdit())
    }

    const closeTask = () => {
        dispatch(closeModalTodo())
    }

    const descrMoreClass = classNames({
        'task__descr_text-more': descrMore
    })

    const descrMoreHandler = () => {
        setDescrMore(!descrMore);
    }

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
                <Priority/>
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
                    <div className={`task__descr_text ${descrMoreClass}`}>
                        {activeTask.descr}
                    </div>
                    <div className="task__buttons">
                        <button
                            className='task__descr_more'
                            onClick={descrMoreHandler}
                        >
                            Развернуть</button>
                        <button className='task__comments'>Комментарии</button>
                        <button onClick={editDescr}>Изменить описание</button>
                        <button onClick={closeTask}>Закрыть</button>
                    </div>
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
            <div className="task__editDescr">
                {isDescrEdit ? <DescrEditor /> : null}
            </div>
        </div>
    )
}

export default Task