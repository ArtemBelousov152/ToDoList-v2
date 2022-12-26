import Status from '../../status/Status';
import MinTask from '../../minTask/MinTask';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useEffect, useState } from 'react';

import './tasks.scss';
import { IProject } from '../../../models';

function Tasks() {
    const [project, setProject] = useState<IProject>();
    const {id} = useParams();
    const {projects} = useAppSelector(state => state.todoReducer)
    const dispatch = useAppDispatch();
    console.log(project);
    useEffect(() => {
        projects.forEach(item => {
            if (item.id === id) {
                setProject(item)
            }
        })
    },[id])

    return (
        <div className='tasks'>
            <div className="tasks__header">
                <h1 className='tasks__name'>{project?.title}</h1>
                <button className="tasks__add">Добавить задачу</button>
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