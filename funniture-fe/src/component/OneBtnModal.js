import { Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function OneBtnModal({ showOneBtnModal, setShowOneBtnModal, btnText }) {

    const handleClose = () => setShowOneBtnModal(false);

    return (
        <>
            <Modal show={showOneBtnModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {btnText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default OneBtnModal;