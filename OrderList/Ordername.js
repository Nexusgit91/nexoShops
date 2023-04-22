import { useEffect, useState } from "react";
import { Container, Table, Form, Modal } from "react-bootstrap";
import "../ProductList/ProductList.css";
import DeleteModal from "./DeleteModal";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//components
function Ordername({ email, name, lastName }) {
  const [orders, setOrders] = useState([]);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [checkedOrders, setCheckedOrders] = useState({});
  const [timeLeft, setTimeLeft] = useState([]);

  const dummy = "jsnkfjnskdjfnksdjfnksdjnf";

  const filteredOrders = orders
    .filter(
      (order) =>
        order.email.toLowerCase() === (email ? email : dummy).toLowerCase()
    )
    .map((order, index) => ({
      ...order,
      timeLeft: timeLeft[index] || 0,
    }));

  //useEffect for timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeLeftArr = filteredOrders.map((order) => {
        const orderTime = new Date(order.date).getTime();
        const timeDiff = orderTime + 172800000 - now; // 172800000 = 48 hours in milliseconds
        if (timeDiff < 0) {
          return "Expired";
        }
        const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutesLeft = Math.floor(
          (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
        );
        const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);
        return `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
      });
      setTimeLeft(timeLeftArr);
    }, 1000);
    return () => clearInterval(interval);
  }, [filteredOrders]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/orders");
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error("Unable to fetch orders");
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchOrders();
  }, []);

  async function handleDeleteOrder(order) {
    try {
      const response = await fetch(`/api/orders/${order._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setOrders((orders) => orders.filter((o) => o._id !== order._id));
      } else {
        console.error(`Unable to delete order with id ${order._id}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // store the check mark in the database
  async function handleCheckedChange(orderId, checked) {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ checked }),
      });
      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === updatedOrder._id ? updatedOrder : order
          )
        );
        setCheckedOrders((prevCheckedOrders) => ({
          ...prevCheckedOrders,
          [updatedOrder._id]: updatedOrder.checked,
        }));
      } else {
        console.error("Unable to update order");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {showDeleteModal && (
        <DeleteModal
          order={orderToDelete}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={(order) => {
            handleDeleteOrder(order);
            setShowDeleteModal(false);
          }}
        />
      )}

      <Container style={{ marginTop: "100px", marginRight: "380px" }}>
        <h1>
          All Orders of {name} {lastName}
        </h1>
        <Form
          style={{ marginBottom: "20px", marginTop: "40px", width: "129%" }}
        >
          <Form.Group controlId="formSearch">
            <Form.Control
              type="email"
              placeholder="Search by email"
              value={email}
            />
          </Form.Group>
        </Form>
        <Table bordered hover style={{ width: "129%", marginRight: "350px" }}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Date and Time</th>
              <th style={{ fontSize: "10px", fontWeight: "bold" }}>
                Order will be delivered <br></br>within 48 hours
              </th>
              <th>Total Cost</th>
              <th>Items</th>
              <th>Cancel order</th>
              <th>Checked</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.address}</td>

                <td>{new Date(order.date).toLocaleString()}</td>
                <td>{order.checked ? "completed" : order.timeLeft}</td>
                <td>
                  $
                  {order.cartItems
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </td>
                <td>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.cartItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <img
                              src={item.imgSrc}
                              alt={item.name}
                              height="50px"
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </td>
                <td>
                  <button
                    className="heading-container"
                    style={{
                      marginLeft: "33px",
                      borderRadius: "200px",
                      border: "none",
                    }}
                    onClick={() => {
                      setOrderToDelete(order);
                      setShowDeleteModal(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
                <td>
                  {sessionStorage.getItem("email") === "nexo91@gmail.com" ? (
                    <Form.Check
                      type="switch"
                      id={`checked-${order._id}`}
                      checked={checkedOrders[order._id]}
                      onChange={(e) =>
                        handleCheckedChange(order._id, e.target.checked)
                      }
                      label={
                        checkedOrders[order._id]
                          ? "Ordered Success"
                          : "Not Delivered"
                      }
                    />
                  ) : (
                    ""
                  )}
                  <h>
                    {order.email === "nexo91@gmail.com"
                      ? ""
                      : order.checked
                      ? "Ordered Success"
                      : "Not Delivered"}{" "}
                  </h>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Ordername;
