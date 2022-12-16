import { FC } from 'react';
import classNames from 'classnames';

import './status.scss';

interface StatusProps {
  min?: boolean
}

const Status: FC<StatusProps> = ({min}) => {

  const classStatus = classNames(
    {'status__mini': min}
  )

  return (
    <div className={`status ${classStatus}`}></div>
  )
}

export default Status