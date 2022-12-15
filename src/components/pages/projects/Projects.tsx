import React from 'react'

import './projects.scss';

function Projects() {
  return (
    <div className='projects'>
      <h1 className='projects__title'>Список проектов</h1>
      <div className="projects__grid">
        <div className="projects__item">
          <h2 className='projects__name'>Название проекта</h2>
          <h2 className='projects__tasks'>Список задач:</h2>
          <ul className='projects__list'>
            <li>1. Имя задачи</li>
            <li>2. Имя задачи</li>
            <li>3. Имя задачи</li>
            <li>4. Имя задачи</li>
            <li>5. Имя задачи</li>
          </ul>
        </div>
        <div className="projects__item">
          <h2 className='projects__name'>Название проекта</h2>
          <h2 className='projects__tasks'>Список задач:</h2>
          <ul className='projects__list'>
            <li>1. Имя задачи</li>
            <li>2. Имя задачи</li>
            <li>3. Имя задачи</li>
            <li>4. Имя задачи</li>
            <li>5. Имя задачи</li>
          </ul>
        </div>
        <div className="projects__item">
          <h2 className='projects__name'>Название проекта</h2>
          <h2 className='projects__tasks'>Список задач:</h2>
          <ul className='projects__list'>
            <li>1. Имя задачи</li>
            <li>2. Имя задачи</li>
            <li>3. Имя задачи</li>
            <li>4. Имя задачи</li>
            <li>5. Имя задачи</li>
          </ul>
        </div>
        <div className="projects__item">
          <h2 className='projects__name'>Название проекта</h2>
          <h2 className='projects__tasks'>Список задач:</h2>
          <ul className='projects__list'>
            <li>1. Имя задачи</li>
            <li>2. Имя задачи</li>
            <li>3. Имя задачи</li>
            <li>4. Имя задачи</li>
            <li>5. Имя задачи</li>
          </ul>
        </div>
      </div>
      <button className="projects__add">Добавить проект</button>
    </div>
  )
}

export default Projects