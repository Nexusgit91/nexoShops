import { useEffect, useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeLeft, setTimeLeft] = useState([]);
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
        alert("user is unauthorized");
      }
    }
    fetchOrders();
  }, []);

  const filteredOrders = orders
    .filter((order) =>
      order.address.toLowerCase().includes(searchTerm.toLowerCase())
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
      } else {
        console.error("Unable to update order");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container
      style={{
        marginTop: "90px",
        marginRight: "300px",
      }}
    >
      <h1>All Orders</h1>
      <Form style={{ marginBottom: "20px", marginTop: "25px", width: "120%" }}>
        <Form.Group controlId="formSearch">
          <Form.Control
            type="text"
            placeholder="Search by address"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Table bordered hover style={{ width: "120%" }}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Date and Time</th>
            <th> 48 hours</th>
            <th>Total Cost</th>
            <th>Items</th>
            <th>Checked</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>
                <a
                  style={{ color: "black", fontWeight: "bold" }}
                  href={`https://www.google.com/maps/place/${order.address}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> {order.address}
                </a>
              </td>
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
                {sessionStorage.getItem("email") === "nexo91@gmail.com" ? (
                  <Form.Check
                    type="switch"
                    id={`checked-${order._id} `}
                    checked={order.checked}
                    onChange={(e) =>
                      handleCheckedChange(order._id, e.target.checked)
                    }
                    label=""
                  />
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default OrderList;
