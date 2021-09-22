import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {dialogsActions, DialogsType, MessagesType} from "../../redux/dialogs-reducer";
import DialogsForm from "./DialogsForm";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import withAuthRedirectComponentCreator from "../../hoc/withAuthRedirect";


const Dialogs: React.FC = () => {

    const dialogs = useSelector((state: AppStateType) => state.dialogsPage.dialogs);
    const messages = useSelector((state: AppStateType) => state.dialogsPage.messages);
    const dispatch = useDispatch();

    let dialogsElements = dialogs.map((d: DialogsType) => <DialogItem name={d.name} id={d.id} key={d.id}/>);
    let messagesElements = messages.map((m: MessagesType) => <Message message={m.message} key={m.id}/>);

    let onSendNewMessage = (values: any) => {
        dispatch(dialogsActions.sendNewMessage(values.postMessage));
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div className={s.newMessage}>
                    <DialogsForm onSubmit={onSendNewMessage}/>
                </div>
            </div>
        </div>
    )
};


export default withAuthRedirectComponentCreator(Dialogs);

