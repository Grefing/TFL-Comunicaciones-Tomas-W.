import { Button, Modal } from "react-bootstrap";
import './modalWindow.css'

const ModalWindow = ({ show, onHide, imgURL }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <img src={imgURL} alt="" className="imgModal img-fluid"/>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} className="btn-danger">Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalWindow;
