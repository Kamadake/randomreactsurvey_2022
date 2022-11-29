/**
 * Took example from https://www.youtube.com/watch?v=LyLa7dU5tp8 for Modal with Portals
 */
import './Modal.css';
import ReactDom from 'react-dom';

type modalArguments = {
    open: boolean,
    children: JSX.Element | JSX.Element[] | null,
    handleClose?: (() => void) | undefined;
}

export function Modal({ open, children, handleClose }: modalArguments) {
    if (!open || children === null) return null;

    return ReactDom.createPortal(
        <div className='modal animate--fadein'>
            <div onClick={handleClose} className='modal__background' />
            <div className='modal__container'>
                {children}
            </div>
        </div>
    , document.getElementById('modal') as Element);
}