import ReactDOM from 'react-dom';

const modalRoot: HTMLElement | null = document.getElementById('modal');

interface IPortalProps {
  children: React.ReactNode,
  isOpened: boolean
};

const Portal: React.FC<IPortalProps> = ({ children, isOpened }) => {
  if (!isOpened) {
    return null;
  }

  if (!modalRoot) {
    return null

  }
  return ReactDOM.createPortal(children, modalRoot);
};

export default Portal;
