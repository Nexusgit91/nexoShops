import React, { useState, useEffect } from "react";
import Ordername from "../OrderList/Ordername";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Profile() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
        setShowModal(true);
      }
    }

    fetchData();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {user ? (
        <Ordername
          email={user.email}
          name={user.firstName}
          lastName={user.lastName}
        />
      ) : (
        <p>Loading...</p>
      )}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Authentication Failed</Modal.Title>
        </Modal.Header>
        <Modal.Body>You need to be logged in to access this page.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Profile;
