import { Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalCss from './BtnModal.module.css'

function BtnModal({ showBtnModal, setShowBtnModal, btnText, secondBtnText,
    modalContext, modalTitle, modalSize, childContent }) {

    const handleClose = () => setShowBtnModal(false);

    return (
        <>
            <Modal show={showBtnModal}
                onHide={handleClose}
                size={modalSize}
                centered
                dialogClassName={ModalCss.customModal}
                contentClassName={ModalCss.modalContent}
                backdropClassName={ModalCss.backDrop}
            >
                <Modal.Header closeButton className={ModalCss.modalHeader}>
                    {modalTitle ? modalTitle : null}
                </Modal.Header>
                <Modal.Body className={ModalCss.modalBody}>
                    {childContent ? childContent : modalContext ? modalContext : null}
                </Modal.Body>
                <Modal.Footer className={ModalCss.modalFooter}>
                    {btnText ?
                        <Button onClick={handleClose}>
                            {btnText}
                        </Button>
                        : null}
                    {secondBtnText ?
                        <Button onClick={handleClose}>
                            {secondBtnText}
                        </Button>
                        : null}
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default BtnModal;