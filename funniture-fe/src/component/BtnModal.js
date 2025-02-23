import { Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalCss from './BtnModal.module.css'

function BtnModal({ showBtnModal, setShowBtnModal, btnText, secondBtnText,
    modalContext, modalTitle, modalSize, childContent , onClose }) {

    // const handleClose = () => setShowBtnModal(false);

    // 로그인 시 모달창 띄우려고 onClose 추가
    const handleClose = () => {
        setShowBtnModal(false); // 모달 닫기
        if (onClose) {
            onClose(); // onClose 콜백 호출
        }
    };
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