import Status from '../status/Status';

import './task.scss';

const Task = () => {
  return (
    <div className='task'>
        <div className="task__header">
            <div className="task__number">№1</div>
            <div className="task__created">
                Дата создания: 01.02.2022
            </div>
            <div className="task__end">
                Дата окончания: 01.02.2023
            </div>
            <h2 className="task__name">Название задачи</h2>
            <div className="task__priority">
                Приоритет:
                 <br /> <span>Важно</span>
            </div>
            <div className="task__workTime">
                Время в работе:
                 <br /> 60 часов
            </div>
            <Status min={true}/>
        </div>  
        <div className="task__status">
            Статус выполнения: <span>Queue</span>
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
                <div className="task__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque cum iure dolor amet fuga quis, veniam voluptas eveniet minus, accusamus facilis? Dolores est molestias perspiciatis, quia accusamus vel atque cupiditate! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda ipsum sapiente, nobis quo temporibus suscipit, quam rerum, magni accusantium maxime ipsa ipsam exercitationem perferendis ducimus unde dignissimos blanditiis ad labore.
                </div>
                <button className='task__descr_more'>Подробнее</button>
                <button className='task__comments'>Комментарии</button>
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

export default Task