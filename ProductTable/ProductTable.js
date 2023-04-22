import React, { useState, useEffect } from "react";
import { Container, Table, Form, Modal } from "react-bootstrap";
import { products } from "../ProductList/Datajson/buyProduct";

const ProductTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/producttable", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          setIsAuthenticated(true);
          const data = await response.json();
        } else {
          console.error("Unable to fetch orders");

          setShowModal(true);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchOrders();
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {showModal && (
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>
            <p>
              You are not authorized to view this page. Only Admin can access
              this page
            </p>
          </Modal.Body>
        </Modal>
      )}

      {!isAuthenticated && <div className="modal-backdrop show"></div>}

      {isAuthenticated && (
        <Container className="product-table" style={{ marginTop: "200px" }}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search products by name"
              value={searchTerm}
              onChange={handleChange}
            />
          </Form.Group>
          <h1 style={{ marginTop: "20px" }}> All the buy orders</h1>
          <Table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>BuyAt</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.imgSrc}
                      alt={product.name}
                      style={{ width: "200px" }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>${product.buy.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  );
};

export default ProductTable;
