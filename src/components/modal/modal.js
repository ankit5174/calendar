import React from 'react';
import './modal.css';

class Modal extends React.PureComponent {

    render() {
        const {children, show} = this.props;
        const modalClassess = show ? 'modal fade show' : 'modal fade';
        return (
            <div className={modalClassess} id="myModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
