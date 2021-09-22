import {maxLength, required} from "../../common/utilites/validators";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import Textarea from "../../common/LoginInput/Textarea";
import React from "react";
import {MyPostsFormValuesType} from "./MyPosts";

export const maxLength10 = maxLength(10);

const MyPostsForm:React.FC<InjectedFormProps<MyPostsFormValuesType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'post text'} name={"postText"} component={Textarea} validate={[required, maxLength10]}/>
            </div>
            <div>
                <button type={"submit"}>Add post</button>
            </div>
        </form>
    )
};

export default reduxForm<MyPostsFormValuesType>({
    form: 'myPosts'
})(MyPostsForm);


