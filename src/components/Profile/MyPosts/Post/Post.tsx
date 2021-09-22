import React from 'react';
import s from './Post.module.css';

const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={s.item}>
      <img alt='ava' src='https://offvkontakte.ru/wp-content/uploads/avatarka-pustaya-vk_0.jpg' />
        { props.message }
          <div>
        <span>like</span> { props.likesCount }
      </div>
    </div>
  )
};

export default Post;


type PropsType = {
    message: string,
    likesCount: number
};