import { Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalCss from './BtnModal.module.css'

function BtnModal({ showBtnModal, setShowBtnModal, btnText, secondBtnText,
    modalContext, modalTitle, modalSize, childContent, onSuccess, onFail, onClose }) {

    // 두번째 버튼은 보통 취소 버튼으로 취소 또는 불허가 일때의 함수 정의
    const handleFailClose = () => {
        setShowBtnModal(false);

        if (onFail) {
            onFail();
        }
    }

    // 성공(또는 확인) 시 진행될 함수
    const handleSuccessClose = () => {
        setShowBtnModal(false); // 모달 닫기
        if (onSuccess) {
            onSuccess(); // onClose 콜백 호출
        }
    };

    // header의 x버튼이 눌렸을때 동작할 함수
    const handleOnClose = () => {
        setShowBtnModal(false); // 모달 닫기

        if (onClose) {
            onClose(); // onClose 콜백 호출
        }
    };

    return (
        <>
            <Modal show={showBtnModal}
                onHide={handleFailClose}
                size={modalSize}
                centered
                dialogClassName={ModalCss.customModal}
                contentClassName={ModalCss.modalContent}
                backdropClassName={ModalCss.backDrop}
            >
                <Modal.Header closeButton className={ModalCss.modalHeader} onHide={handleOnClose}>
                    {modalTitle ? modalTitle : null}
                </Modal.Header>

                <Modal.Body className={ModalCss.modalBody}>
                    {childContent ? childContent : modalContext ? modalContext : null}
                </Modal.Body>
                <Modal.Footer className={ModalCss.modalFooter}>
                    {btnText ?
                        <Button onClick={handleSuccessClose}>
                            {btnText}
                        </Button>
                        : null}
                    {secondBtnText ?
                        <Button onClick={handleFailClose}>
                            {secondBtnText}
                        </Button>
                        : null}
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default BtnModal;