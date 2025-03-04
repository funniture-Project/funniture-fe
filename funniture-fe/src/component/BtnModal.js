import { Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalCss from './BtnModal.module.css'
import { useState } from "react";
import { useRef, useEffect } from "react";

function BtnModal({ showBtnModal, setShowBtnModal, btnText, secondBtnText,
    modalContext, modalTitle, modalSize, childContent, onSuccess, onFail, onClose, attachmentFile }) { // 25-02-27 attachmentFile 추가

    const [showImageModal, setShowImageModal] = useState(false); // 이미지 확대 모달 상태
    const modalRef = useRef(null);

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
            <Modal
                show={showBtnModal}
                onHide={handleOnClose}
                size={modalSize}
                centered
                dialogClassName={ModalCss.customModal}
                contentClassName={ModalCss.modalContent}
                backdropClassName={ModalCss.backDrop}
            // container={modalRef.current}
            >
                <Modal.Header closeButton className={ModalCss.modalHeader} onHide={handleOnClose}>
                    {modalTitle ? modalTitle : null}
                </Modal.Header>

                <Modal.Body className={ModalCss.modalBody}>
                    {childContent ? childContent : modalContext ? modalContext : null}

                    {attachmentFile && (
                        <>
                            <p><strong>첨부파일:</strong></p>
                            <img
                                src={attachmentFile}
                                alt="첨부파일"
                                style={{ width: '100%', cursor: 'pointer' }}
                                onClick={() => setShowImageModal(true)}
                            />
                        </>
                    )}
                </Modal.Body>

                {/* 왼쪽 pdf , 오른쪽 데이터들로 나누기 */}
                {/* <Modal.Body className={ModalCss.modalBody}>
                {typeof modalContext === 'object' && modalContext.left && modalContext.right ? (
                    <div className="row">
                        <div className="col-md-6">{modalContext.left}</div>
                        <div className="col-md-6">{modalContext.right}</div>
                    </div>
                ) : (
                    modalContext // 단순 텍스트나 JSX 구조를 그대로 렌더링
                )}
            </Modal.Body> */}
                <Modal.Body className={ModalCss.modalBody}>
                    {modalContext && typeof modalContext === 'object' && modalContext.left && modalContext.right ? (
                        // 새로운 레이아웃: 왼쪽과 오른쪽으로 나누어진 구조
                        <div className="row">
                            <div className="col-md-6">{modalContext.left}</div>
                            <div className="col-md-6">{modalContext.right}</div>
                        </div>
                    ) : (
                        // 기존 방식: childContent 또는 단순 텍스트/JSX 구조
                        childContent || modalContext
                    )}
                </Modal.Body>

                <Modal.Footer className={ModalCss.modalFooter}>
                    {btnText &&
                        <Button onClick={handleSuccessClose}>
                            {btnText}
                        </Button>
                    }
                    {secondBtnText &&
                        <Button onClick={handleFailClose}>
                            {secondBtnText}
                        </Button>
                    }
                </Modal.Footer>
            </Modal>

            <Modal show={showImageModal} onHide={() => setShowImageModal(false)} centered>
                <Modal.Body>
                    <img src={attachmentFile} alt="확대된 첨부파일" style={{ width: '100%' }} />
                </Modal.Body>
            </Modal>
        </>
    );


}

export default BtnModal;