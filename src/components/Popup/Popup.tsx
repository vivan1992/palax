import { useState, useEffect } from "react";
import "./style.css";

interface IPopupProps {
  post: {
    id: number,
    body: string,
    isCreate?: boolean
  },
  onClose: () => void,
  onUpdate: (id: number, body: string) => void,
  isOpen: boolean
};

const Popup: React.FC<IPopupProps> = ({ post, onClose, onUpdate, isOpen }) => {
  const [body, setBody] = useState<string>(post.body);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onUpdate(post.id, body);
  }

   useEffect(() => {
    function handleEscClose(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
    }

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isOpen]);

  return (
    <div className='popup'>
      <form className='popup__container' onSubmit={handleSubmitForm}>
        <p className="popup__title">{post.isCreate ? 'Создание поста' : 'Редактирование поста'}</p>
        <textarea
          name='body'
          className='popup__body'
          onChange={(e) => setBody(e.target.value)}
          value={body}
          rows={8}
          cols={50}
        />
        <button  disabled={body === ''} className='popup__button'>Сохранить</button>
      </form>
      <button className='popup__close' onClick={onClose}/>
    </div>
  )
}

export default Popup;
