import Status from '../../status/Status';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useEffect, useState } from 'react';
import { todoSlice } from '../../../store/reducers/todoSlice';
import { IProject, } from "../../../models/project";
import Task from '../../task/Task';
import { ModalAddTodo } from '../../modalAddTask/ModalAddTodo';
import { status } from '../../../models/enums';
import { useNavigate } from 'react-router-dom';
import TasksBoard from '../../tasksBoard/TasksBoard';

import './tasks.scss';

function Tasks() {
    const [project, setProject] = useState<IProject>({ id: '', tasks: [], title: 'as', status: status.INPROGRESS });
    const { id } = useParams() as { id: string };
    const { projects, modalTodoIsOpen, activeProjectIndex } = useAppSelector(state => state.todoReducer)
    const dispatch = useAppDispatch();
    const { openModalAddTodo, closeModalTodo, setActiveProjectId } = todoSlice.actions;
    const navigate = useNavigate();

    useEffect(() => {
        projects.forEach((item, index) => {
            if (item.id === id) {
                setProject(item)
                if (index !== activeProjectIndex) {
                    dispatch(setActiveProjectId(index))
                }
            }
        })
    }, [projects])

    const modalWindowTask = modalTodoIsOpen ?
        <Task />
        : null

    const backToProjects = () => {
        navigate('/')
        dispatch(closeModalTodo())
    }

    return (
        <div className='tasks'>
            {<ModalAddTodo
            id={id}
            project={project}/>}
            <div className="tasks__header">
                <h1 className='tasks__name'>{project.title}</h1>
                <button
                    className='tasks__back'
                    onClick={backToProjects}>К проектам</button>
                <button
                    className="tasks__add"
                    onClick={() => dispatch(openModalAddTodo())}>
                    Добавить задачу</button>
                <Status position={project.status} />
            </div>
            <div className="tasks__names">
                <h2>Queue</h2>
                <h2>Development</h2>
                <h2>Done</h2>
            </div>
            <div className="tasks__modalTask">
                    {modalWindowTask}
                </div>
            <TasksBoard project={project}/>
        </div>
    )
}

export default Tasks