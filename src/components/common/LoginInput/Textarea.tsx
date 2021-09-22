import React from "react";
import s from './Textarea.module.css'
import {WrappedFieldMetaProps} from "redux-form";


const Textarea: React.FC<FormControlPropsType> = ({input, meta:{touched, error}, placeholder}) => {
    const hasError = touched && error;
    return (
        <div>
            <div className={s.formField + ' ' + (hasError ? s.error : '')}><textarea {...input} placeholder={placeholder}/></div>
            {hasError && <div className={s.error}><span>{error}</span></div>}
        </div>
    )
};

export const Input: React.FC<FormControlPropsType> = ({input, meta:{touched, error}, placeholder, type}) => {
    const hasError = touched && error;
    return (
        <div>
            <div className={s.formField + ' ' + (hasError ? s.error : '')}><input {...input} placeholder={placeholder} type={type}/></div>
            {hasError && <div className={s.error}><span>{error}</span></div>}
        </div>
    )
};


export default Textarea;


type FormControlPropsType = {
    input: React.ReactNode
    meta: WrappedFieldMetaProps
    placeholder: string | undefined
    type?: string
}
