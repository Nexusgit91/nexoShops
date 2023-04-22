import { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Css/Cart.css";
import IconGrid from "../IconGrid/IconGrid";
import "./ProductList.css";
function Cart({ cartItems, handleRemoveFromCart, handleClearCart }) {
  const history = useHistory();
  const userEmail = window.sessionStorage.getItem("email");
  const [orderFormData, setOrderFormData] = useState({
    name: "",
    email: userEmail,
    address: "",
    totalPrice: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      const modal = document.createElement("div");
      modal.style =
        "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8); display: flex; justify-content: center; align-items: center; z-index: 999;";
      modal.innerHTML =
        "<h1 style='color: white;'>Please login to submit the order.</h1><button style='margin-top: 20px; background-color: white; color: black; border: none; padding: 10px 20px; font-size: 16px; cursor: pointer;'>Login</button>";
      document.body.appendChild(modal);

      const loginButton = modal.querySelector("button");
      loginButton.addEventListener("click", () => {
        window.location.href = "/login";
      });

      return;
    }

    const orderData = { ...orderFormData, cartItems };
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (response.ok) {
        // Order submitted successfully
        console.log("Order submitted successfully");
        // Clear cart and order form data
        setOrderFormData({ name: "", email: "", address: "" });
        // You may also want to update the cart items in the parent component
        // Clear cart items
        handleClearCart();
        // Store the total price in a session cookie
        window.sessionStorage.setItem("totalPrice", totalPrice.toFixed(2));
        window.location.replace("/pay");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <>
      <Container style={{ marginBottom: "20px" }}>
        <Table className="my-5">
          <thead>
            <tr>
              <th>id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.id} className="heading-container">
                <td>{index + 1}</td>
                <td>
                  <img src={item.imgSrc} alt={item.name} height="50px" />
                </td>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={4}></td>
              <td>
                <strong>Total:</strong>
              </td>
              <td>${totalPrice.toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
        <h3>Order Form</h3>
        <form onSubmit={handleSubmitOrder}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              className="form-control"
              type="text"
              id="name"
              name="name"
              value={orderFormData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              value={orderFormData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              className="form-control"
              type="text"
              id="address"
              name="address"
              value={orderFormData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalCost">Total Cost:</label>
            <input
              className="form-control"
              type="text"
              id="totalCost"
              name="totalCost"
              value={totalPrice}
              readOnly
            />
          </div>
          <Button type="submit" className="btn btn-primary">
            Submit Order
          </Button>
        </form>
      </Container>

      <h
        style={{
          fontStyle: "italic",
          color: "black",
          fontSize: "16px",
          backgroundColor: "yellow",
          borderRadius: "10px",
          width: "400px",
        }}
      >
        <h4> *Require login to submit the order</h4>
        <h4> *Orderd will be delivered within 48 hours</h4>
        <br></br>* Notice the name of the product contain <b> s_id</b> it stands
        for
        <b> shop_id </b> it realted to the shop owners not to the customers so
        ignore it.
      </h>
    </>
  );
}

export default Cart;
