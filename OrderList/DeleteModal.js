import React from "react";
import { Container, Table, Form, Modal, Button } from "react-bootstrap";
function DeleteModal({ order, onCancel, onConfirm }) {
  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to Cancel the order {order.id}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => onConfirm(order)}>
          Delete Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
