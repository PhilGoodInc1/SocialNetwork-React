import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/users-reducer";
import {useSelector} from "react-redux";
import {getFilterSelector} from "./Users-selectors";

const UsersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
};

export const UsersSearchForm: React.FC<PropsType> = React.memo(({onFilterChange}) => {

    const  filter = useSelector(getFilterSelector);
    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter = {
            term: values.term,
            friend: values.friend === 'null'? null : values.friend === "true"
        };
        onFilterChange(filter);
        setSubmitting(false);
    };

    return <div>
        <Formik
            enableReinitialize
            initialValues={{term: filter.term, friend: String(filter.friend) as FriendType}}
            validate={UsersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field name="friend" as="select">
                        <option value="null">All users</option>
                        <option value="true">Followed Users</option>
                        <option value="false">Others</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
});

type PropsType = {
    onFilterChange: (values: FilterType) => void
};

type FriendType = 'null' | 'true' | 'false'
type FormType = {
    term: string,
    friend: FriendType
}

