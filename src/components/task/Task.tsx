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
            <div className="task__priority">Приоритет: <br /> <span>Важно</span></div>
            <div className="task__workTime">Время в работе: <br /> 60 часов</div>
            <Status min={true}/>
        </div>
    </div>
  )
}

export default Task