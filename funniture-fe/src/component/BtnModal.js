import { Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalCss from './BtnModal.module.css'
import { useState } from "react";

function BtnModal({ showBtnModal, setShowBtnModal, btnText, secondBtnText,
    modalContext, modalTitle, modalSize, childContent, onSuccess, onFail, onClose, attachmentFile }) { // 25-02-27 attachmentFile 추가

    const [showImageModal, setShowImageModal] = useState(false); // 이미지 확대 모달 상태

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

                    {/* 첨부파일 표시 추가*/}
                    {attachmentFile && (
                        <>
                            <p><strong>첨부파일:</strong></p>
                            <img
                                src={attachmentFile}
                                alt="첨부파일"
                                style={{ width: '100%', cursor: 'pointer' }}
                                onClick={() => setShowImageModal(true)} // 클릭 시 이미지 확대 모달 열기
                            />
                        </>
                    )}                

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

                        {/* 이미지 확대 모달 추가*/}
                        <Modal show={showImageModal} onHide={() => setShowImageModal(false)} centered>
                <Modal.Body>
                    <img src={attachmentFile} alt="확대된 첨부파일" style={{ width: '100%' }} />
                </Modal.Body>
            </Modal>
        </>
    );

}

export default BtnModal;