import Status from '../../status/Status';
import MinTask from '../../minTask/MinTask';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useEffect, useState } from 'react';
import { todoSlice } from '../../../store/reducers/todoSlice';
import { IProject, } from "../../../models/project";
import Task from '../../task/Task';
import { ModalAddTodo } from '../../modalAddTask/ModalAddTodo';
import { status } from '../../../models/enums';
import { useNavigate } from 'react-router-dom';

import './tasks.scss';


function Tasks() {
    const [project, setProject] = useState<IProject>({ id: '', tasks: [], title: 'as', status: status.INPROGRESS });
    const { id } = useParams() as { id: string };
    const { projects, modalAddTodoIsOpen, modalTodoIsOpen } = useAppSelector(state => state.todoReducer)
    const dispatch = useAppDispatch();
    const { openModalAddTodo, closeModalTodo, setActiveProjectId } = todoSlice.actions;
    const navigate = useNavigate();

    useEffect(() => {
        projects.forEach(item => {
            if (item.id === id) {
                setProject(item)
                dispatch(setActiveProjectId(id))
            }
        })
    }, [projects])

    const modalWindowAddTodo = modalAddTodoIsOpen ?
        <ModalAddTodo
            id={id}
            project={project} />
        : null;

    const modalWindowTask = modalTodoIsOpen ?
        <Task />
        : null

    const renderTasks = () => {
        return (
            project.tasks.map(item => {
                return <MinTask
                    descr={item.descr}
                    number={item.number}
                    priority={item.priority}
                    startDate={item.startDate}
                    timeInWork={item.timeInWork}
                    title={item.title}
                    key={item.id}
                    id={item.id}
                    projectId={id}
                    status={item.status} />
            })
        )
    }

    const backToProjects = () => {
        navigate('/')
        dispatch(closeModalTodo())
    }

    return (
        <div className='tasks'>
            {modalWindowAddTodo}
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
            <div className="tasks__drag_zone">
                <div className="tasks__modalTask">
                    {modalWindowTask}
                </div>
                <div className="tasks__dgar_block">
                    <h2 className="tasks__drag_name">Queue</h2>
                    <ul className="tasks__drag_area">
                        {renderTasks()}
                    </ul>
                </div>
                <div className="tasks__dgar_block">
                    <h2 className="tasks__drag_name">Development</h2>
                    <ul className="tasks__drag_area tasks__drag_center">

                    </ul>
                </div>
                <div className="tasks__dgar_nlock">
                    <h2 className="tasks__drag_name">Done</h2>
                    <ul className="tasks__drag_area">

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Tasks