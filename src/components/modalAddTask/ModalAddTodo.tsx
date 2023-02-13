import { useState, FC } from 'react'
import { priority, state, status } from '../../models/enums';
import { v4 as uuidv4 } from 'uuid';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IProject } from '../../models/project';
import { todoSlice } from '../../store/reducers/todoSlice';
import { ITusk } from '../../models/task';

import './modalAddTodo.scss';

interface modalAddTodoProps {
    id: string;
    project: IProject;
}

export const ModalAddTodo: FC<modalAddTodoProps> = ({ id, project }) => {
    const [newTaskName, setNewTaskName] = useState<string>('');
    const [newTaskDescr, setNewTaskDescr] = useState<string>('');
    const [day, setDay] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const dispatch = useAppDispatch();
    const { modalAddTodoIsOpen } = useAppSelector(state => state.todoReducer);
    const { addTask, closeModalAddTodo } = todoSlice.actions;

    const createTask = () => {
        const endDate = new Date(+year, +month, +day).toLocaleDateString();
        const nowDate = new Date().toLocaleDateString();
        const newTask: ITusk = {
            title: newTaskName,
            descr: newTaskDescr,
            id: uuidv4(),
            priority: priority.OPTIONAL,
            state: state.QUEUE,
            status: status.INPROGRESS,
            number: project.tasks.length + 1,
            startDate: nowDate,
            endDate: endDate,
            timeInWork: 0
        }
        dispatch(addTask({ projectId: id, task: newTask }))
        closeModal();
        setDay('');
        setMonth('');
        setYear('');
    }

    const closeModal = () => {
        dispatch(closeModalAddTodo())
        setNewTaskName('');
        setNewTaskDescr('');
    }

    return (
        <Modal
            open={modalAddTodoIsOpen}
            onClose={closeModal}>
            <div className="tasks__modal">
                <label htmlFor="title">Имя задачи</label>
                <input
                    className='tasks__modal_input'
                    type="text"
                    id="title"
                    onChange={(e) => setNewTaskName(e.target.value)} />
                <label htmlFor="descr">Описание задачи</label>
                <input
                    className='tasks__modal_input'
                    type="text"
                    id="descr"
                    onChange={(e) => setNewTaskDescr(e.target.value)} />
                <div className="tasks__modal_date">
                    <h3 className='tasks__modal_descr'>DeadLine</h3>
                    <div className="tasks__modal_date-wrapper">
                        <div className="tasks__modal_date-item">
                            <label htmlFor="day">День</label>
                            <input
                                className='tasks__modal_date-input'
                                id='day'
                                type="number"
                                value={day}
                                onChange={(e) => setDay(e.target.value)} />
                        </div>
                        <div className="tasks__modal_date-item">
                            <label htmlFor="month">Месяц</label>
                            <input
                                className='tasks__modal_date-input'
                                id='month'
                                type="number"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)} />
                        </div>
                        <div className="tasks__modal_date-item">
                            <label htmlFor="year">Год</label>
                            <input
                                className='tasks__modal_date-input'
                                id='year'
                                type="number"
                                value={year}
                                onChange={(e) => setYear(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="tasks__modal_btns">
                    <button
                        onClick={createTask}
                        disabled={!Boolean(newTaskName &&
                                           newTaskDescr && 
                                           day &&
                                           month && 
                                           year)}>
                        Создать
                    </button>
                    <button
                        onClick={closeModal}>
                        Отмена
                    </button>
                </div>
            </div>
        </Modal>

    )
}
