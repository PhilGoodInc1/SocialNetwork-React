import {maxLength, required} from "../common/utilites/validators";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import Textarea from "../common/LoginInput/Textarea";
import React from "react";


const maxLength50 = maxLength(50);


const DialogsForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder={'post text'} name={"postMessage"} component={Textarea}
                   validate={[required, maxLength50]}/>
            <button type={'submit'}>Send</button>
        </form>
    )
};

export default  reduxForm<FormDataType>({form: 'dialogs'})(DialogsForm);


type FormDataType = {
    postMessage: string
};

