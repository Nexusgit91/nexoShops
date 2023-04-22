import React, { useState, useEffect } from "react";
import { Table, Modal } from "react-bootstrap";

function ShopOwners() {
  const [shopOwners, setShopOwners] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchShopOwners = async () => {
      try {
        const response = await fetch("/api/getData");
        const data = await response.json();
        setShopOwners(data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchShopOwners();
  }, []);

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      {isAuthenticated ? (
        <>
          <h1 className="text-center mb-5">Shop Owners</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Shop ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {shopOwners.map((shopOwner) => (
                <tr key={shopOwner.s_id}>
                  <td>{shopOwner.s_id}</td>
                  <td>{shopOwner.name}</td>
                  <td>{shopOwner.email}</td>
                  <td>{shopOwner.phone}</td>
                  <td>{shopOwner.address}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <Modal show={true}>
          <Modal.Header>
            <Modal.Title>Authentication Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You need to be authenticated to access this page.</p>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default ShopOwners;
