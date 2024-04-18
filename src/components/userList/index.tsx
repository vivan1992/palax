import React from 'react';
import classNames from 'classnames';
import './styles.css';
import { IUsers, IPosts } from '../../interface/common';

interface IUsersProps {
  users: IUsers[],
  posts: IPosts[],
  selectedUsers: string[],
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
  onEdit: (id: number, body: string) => void,
  onDelete: (id: number) => void
}

const UserList: React.FC<IUsersProps> = ({users, posts, selectedUsers, onClick, onEdit, onDelete}) => {
  return (
    <div className='container'>
      <ul className='header'>
        <li className='header__title'>Юзеры</li>
        <li className='header__title'>Посты</li>
      </ul>
      <ul className='users'>
        {users.map(user => {
          return (
            <li
              key={user.id}
              className='user'
            >
              <button
                className={classNames('user__button', { 'user_active': selectedUsers.includes(`${user.id}`) })}
                onClick={onClick}
                id={`${user.id}`}
              >
                {user.username}
              </button>
              <ul className='posts'>
                {posts.map(post => {
                  if (post.userId === user.id) {
                    return (
                    <li className='post' key={post.id}>
                        {post.body}
                        <button className='post__button-edit' onClick={() => onEdit(post.id, post.body)}/>
                        <button className='post__button-trash' onClick={() => onDelete(post.id)}/>
                    </li>
                  )
                  }
                  return null;
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
 )
}

export default UserList;
