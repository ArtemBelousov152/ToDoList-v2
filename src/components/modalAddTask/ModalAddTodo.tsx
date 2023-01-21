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
    const dispatch = useAppDispatch();
    const { modalAddTodoIsOpen } = useAppSelector(state => state.todoReducer);
    const { addTask, closeModalAddTodo } = todoSlice.actions;

    const createTask = () => {
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
            endDate: 'agsdffg',
            timeInWork: 60
        }
        dispatch(addTask({ projectId: id, task: newTask }))
        closeModal();
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
                    type="text"
                    id="title"
                    onChange={(e) => setNewTaskName(e.target.value)} />
                <label htmlFor="descr">Описание задачи</label>
                <input
                    type="text"
                    id="descr"
                    onChange={(e) => setNewTaskDescr(e.target.value)} />
                <button
                    onClick={createTask}
                    disabled={!Boolean(newTaskName && newTaskDescr)}>
                    Создать
                </button>
                <button
                    onClick={closeModal}>
                    Отмена
                </button>
            </div>
        </Modal>

    )
}
