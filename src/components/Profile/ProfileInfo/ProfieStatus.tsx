import React, {useState, useEffect, ChangeEvent} from 'react';


let ProfileStatus: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

     useEffect(() => {
         setStatus(props.status)
     },[props.status]);

    let activateEditMode = () => {
        setEditMode(true);
    };

    let deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    let onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div>
            {!props.isOwner ? <div><span>{props.status || '-----'}</span></div>
                : editMode
                    ? <div><input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                                  value={status} type="text"/></div>
                    : <div><span onDoubleClick={activateEditMode}>{props.status || '-----'}</span></div>}
        </div>
    )
};

export default ProfileStatus;


type PropsType = {
    status: string,
    updateStatus: (status: string) => void,
    isOwner: boolean
};
