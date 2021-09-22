import React from 'react'
import s from './../Dialogs.module.css'


const Message: React.FC<propsType> = (props) => {
    return <div className={s.dialog}>{props.message}</div>
};

export default Message


type propsType = {
    message: string
};