import { FC } from 'react';
import classNames from 'classnames';

import './status.scss';
import { status } from '../../models/enums';

interface StatusProps {
  min?: boolean;
  position: status
}

const Status: FC<StatusProps> = ({ min, position }) => {

  const classStatus = classNames(
    { 'status__mini': min }
  )

  const progress = classNames(
    {'status__failed': status.FAILD},
    {'status__done': status.DONE},
    {'status__inProcess': status.INPROGRESS}
  )

  return (
    <div className={`status ${classStatus} ${progress}`}></div>
  )
}

export default Status