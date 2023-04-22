import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";
import TypingAnimation from "../TypingAnimation/TypingAnimation";

function Navibar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const history = useHistory();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch("/api/checkLoggedIn");
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setName(data.name);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkLoggedIn();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsLoggedIn(false);
        // on logout
        window.sessionStorage.clear();

        window.location.replace("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Navbar
      expand="md"
      className="fixed-top"
      style={{
        height: "40px",
        marginLeft: "-10px",
        backgroundColor: "white",
        margintTop: "10px",
      }}
    >
      <Navbar.Brand href="/">
        {" "}
        <h
          style={{
            marginLeft: "20px",
          }}
        >
          <font color="blue">N</font>
          <font color="green">e</font>
          <font color="red">x</font>
          <font color="black">o</font>
        </h>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" style={{ fontWeight: "bold" }}>
          <Nav.Link href="/">Home</Nav.Link>
          <NavDropdown title="Categories" id="basic-nav-dropdown">
            <NavDropdown.Item href="/electronics">Electronics</NavDropdown.Item>
            <NavDropdown.Item href="/">Dress</NavDropdown.Item>
            <NavDropdown.Item href="/books">Books</NavDropdown.Item>
            <NavDropdown.Item href="/register">Register</NavDropdown.Item>
            <NavDropdown.Item href="/shopowner">RegisterShops</NavDropdown.Item>
            <NavDropdown.Item href="/producttable">
              ProductTable
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/all-categories">
              All Categories
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/orderList">Orders</Nav.Link>
          <Nav.Link href="/profile">Your Orders</Nav.Link>
          {isLoggedIn ? (
            <>
              <Nav.Link>Hello, {name}</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Signup</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
      {/* <TypingAnimation /> */}
      <h
        style={{
          fontSize: "20px",
          marginRight: "25px",
          color: "#394639",
          fontWeight: "bold",
        }}
      >
        Begumpull Market
      </h>
    </Navbar>
  );
}

export default Navibar;
