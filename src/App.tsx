
import { useEffect, useState } from 'react';
import './App.css';
import api from './services/api';
import { IPosts, IUsers } from './interface/common';
import UserList from './components/userList';
import Portal from './components/Portal';
import Popup from './components/Popup/Popup';

function App() {
  const [users, setUsers] = useState<IUsers[]>((() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  }));
  const [posts, setPosts] = useState<IPosts[]>((() => {
    const storedPosts = localStorage.getItem('posts');
    return storedPosts ? JSON.parse(storedPosts) : [];
  }));
  const [selectedUsers, setSelectedUsers] = useState<string[]>((() => {
    const storedSelectUsers = localStorage.getItem('selectedUsers');
    return storedSelectUsers ? JSON.parse(storedSelectUsers) : [];
  }));
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [post, setPost] = useState<{ id: number, body: string }>({ id: 0, body: '' });

  useEffect(() => {
    api.fetchUser().then(res => {
      setUsers(res);
      localStorage.setItem('users', JSON.stringify(res));
    })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('selectedUsers', JSON.stringify(selectedUsers));
  }, [selectedUsers]);

  const selectUser = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const userId: string = e.currentTarget.id;
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(state => state.filter(id => id !== userId));
      setPosts(state => state.filter(post => post.userId !== +userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
      api.fetchPosts(userId).then(res => {
        setPosts((state) => [...state, ...res]);
      })
        .catch(err => console.log(err));
    }
  }

  const handleUpdatePost = (id: number, body: string): void => {
    api.updatePost(id, {body})
      .then(res => {
        setPosts((state => state.map(post => post.id === id ? { ...post, ...res } : post)));
        setIsOpenPopup(false);
      })
      .catch(err => console.log(err));
  }

   const handleDeletePost = (id: number): void => {
     api.deletePost(id)
       .then(res => setPosts((state => state.filter(post => post.id !== id))))
      .catch(err => console.log(err));
   }

  const handleClickEdit = (id: number, body: string): void => {
    setIsOpenPopup(true);
    setPost({ id, body });
  }

  const handleClose = () => {
    setIsOpenPopup(false);
  }

  return (
    <div className="App">
      <UserList
        users={users}
        onClick={selectUser}
        posts={posts}
        selectedUsers={selectedUsers}
        onEdit={handleClickEdit}
        onDelete={handleDeletePost}
      />
      <Portal isOpened={isOpenPopup}>
        <Popup post={post} onClose={handleClose} onUpdate={handleUpdatePost } isOpen={isOpenPopup} />
      </Portal>
    </div>
  );
}

export default App;
