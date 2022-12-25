import React, { useState } from 'react'
import { IProject } from '../../../models';
import { v4 as uuidv4 } from 'uuid';
import { todoSlice } from '../../../store/reducers/todoSlice';

import './projects.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

function Projects() {
  const [modal, setModal] = useState<boolean>(false);
  const [newProjectName, setNewProjectName] = useState<string>('');
  const {projects} = useAppSelector(state => state.todoReducer);
  const dispatch = useAppDispatch();
  const {addProject} = todoSlice.actions;

  const createProject = () => {
    const newProject: IProject = {
      id: uuidv4(),
      title: newProjectName,
      tasks: []
    }

    dispatch(addProject(newProject));
    closeModal();
  }
  
  const closeModal = () => {
    setModal(false)
    setNewProjectName('')
  }

  const renderTaskList = (index: number) => {
    const list = projects[index].tasks
    if (list.length === 0) {
      return (
        <li>Нет задач</li>
      )
    } else {
      return (
        list.map((item, id) => {
          return <li>{`${id + 1} ${item.title}`}</li>
        })
      )
    }
  }

  const renderProjects = () => {
    if (projects.length === 0) {
      return (
        <h2>Нет проектов</h2>
      )
    } else {
      return (
        projects.map((item, id) => {
          return (
            <div className="projects__item">
            <h2 className='projects__name'>{item.title}</h2>
            <h2 className='projects__tasks'>Список задач:</h2>
            <ul className='projects__list'>
            {renderTaskList(id)}
            </ul>
          </div>
          )
        })
      )
    }
  }

  const modalWindow = modal ? <div className="projects__modal">
                                <input
                                    type="text"
                                    name="name" 
                                    id="name"
                                    onChange={(e) => setNewProjectName(e.target.value)}/>
                                <button
                                      onClick={createProject}
                                      disabled={!Boolean(newProjectName)}>
                                  Создать
                                </button>
                                <button
                                      onClick={closeModal}>
                                  Отмена
                                </button>
                              </div>
                            : null;

  return (
    <div className='projects'>
      {modalWindow}
      <h1 className='projects__title'>Список проектов</h1>
      <div className="projects__grid">
        {renderProjects()}
      </div>
      <button 
        className="projects__add"
        onClick={() => setModal(true)}>
          Добавить проект
      </button>
    </div>
  )
}

export default Projects

