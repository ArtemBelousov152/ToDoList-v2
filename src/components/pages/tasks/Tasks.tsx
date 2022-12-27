import Status from '../../status/Status';
import MinTask from '../../minTask/MinTask';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useEffect, useState } from 'react';
import { todoSlice } from '../../../store/reducers/todoSlice';
import { v4 as uuidv4 } from 'uuid';
import { IProject, } from "../../../models/project";
import { ITusk, priority, state, status } from '../../../models/task';

import './tasks.scss';

function Tasks() {
    const [modal, setModal] = useState<boolean>(false);
    const [project, setProject] = useState<IProject>({id: '',tasks:[],title:'as'});
    const [newTaskName, setNewTaskName] = useState<string>('');
    const [newTaskDescr, setNewTaskDescr] = useState<string>('');
    const {id} = useParams();
    const {projects} = useAppSelector(state => state.todoReducer)
    const dispatch = useAppDispatch();
    const {addTask} = todoSlice.actions;

    useEffect(() => {
        projects.forEach(item => {
            if (item.id === id) {
                setProject(item)
            }
        })
    },[id])

    const createTask = () => {
        const nowDate = new Date().toLocaleDateString();
        const newTask: ITusk = {
            title: newTaskName,
            descr: newTaskDescr,
            id: uuidv4(),
            priority: priority.OPTIONAL,
            state: state.QUEUE,
            status: status.INPROGRESS,
            number: project.tasks.length,
            startDate: nowDate,
            endDate: 'agsdffg',
            timeInWork: 60
        }
        dispatch(addTask({projectId: id, task: newTask}))
        closeModal();
    }

    const closeModal = () => {
        setModal(false);
        setNewTaskName('');
        setNewTaskDescr('');
    }

    const modalWindow = modal ? 
                        <div className="tasks__modal">
                            <label htmlFor="title">Имя задачи</label>
                            <input
                                type="text"
                                id="title"
                                onChange={(e) => setNewTaskName(e.target.value)}/>
                            <label htmlFor="descr">Описание задачи</label>
                            <input 
                                type="text" 
                                id="descr"
                                onChange={(e) => setNewTaskDescr(e.target.value)}/>
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
                            : null;

    return (
        <div className='tasks'>
            {modalWindow}
            <div className="tasks__header">
                <h1 className='tasks__name'>{project?.title}</h1>
                <button 
                    className="tasks__add"
                    onClick={() => setModal(true)}>
                        Добавить задачу</button>
                <Status />
            </div>
            <div className="tasks__drag_zone">
                <div className="tasks__dgar_block">
                    <h2 className="tasks__drag_name">Queue</h2>
                    <ul className="tasks__drag_area">
                        <MinTask />
                    </ul>
                </div>
                <div className="tasks__dgar_block">
                    <h2 className="tasks__drag_name">Development</h2>
                    <ul className="tasks__drag_area tasks__drag_center">

                    </ul>
                </div>
                <div className="tasks__dgar_nlock">
                    <h2 className="tasks__drag_name">Done</h2>
                    <ul className="tasks__drag_area"></ul>
                </div>
            </div>
        </div>
    )
}

export default Tasks