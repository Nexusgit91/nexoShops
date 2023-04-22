import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaTruck, FaCreditCard, FaShieldAlt, FaGift } from "react-icons/fa";

const IconGrid = () => {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (iconName) => {
    setHovered(iconName);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const iconStyle = {
    fontSize: "3rem",
    transition: "transform 0.2s ease-in-out",
  };

  const iconHoveredStyle = {
    transform: "scale(1.2)",
  };

  return (
    <Container style={{ marginTop: "16px " }}>
      <Row className="justify-content-center">
        <Col xs={6} md={3} className="text-center">
          <FaTruck
            style={
              hovered === "delivery"
                ? { ...iconStyle, ...iconHoveredStyle }
                : iconStyle
            }
            onMouseEnter={() => handleMouseEnter("delivery")}
            onMouseLeave={() => handleMouseLeave()}
          />
          <h4> Free & Fast Delivery</h4>
        </Col>
        <Col xs={6} md={3} className="text-center">
          <FaCreditCard
            style={
              hovered === "payment"
                ? { ...iconStyle, ...iconHoveredStyle }
                : iconStyle
            }
            onMouseEnter={() => handleMouseEnter("payment")}
            onMouseLeave={() => handleMouseLeave()}
          />
          <h4>Online Payment</h4>
        </Col>
        <Col xs={6} md={3} className="text-center">
          <FaShieldAlt
            style={
              hovered === "security"
                ? { ...iconStyle, ...iconHoveredStyle }
                : iconStyle
            }
            onMouseEnter={() => handleMouseEnter("security")}
            onMouseLeave={() => handleMouseLeave()}
          />
          <h4>Secured Transaction</h4>
        </Col>
        <Col xs={6} md={3} className="text-center">
          <FaGift
            style={
              hovered === "offers"
                ? { ...iconStyle, ...iconHoveredStyle }
                : iconStyle
            }
            onMouseEnter={() => handleMouseEnter("offers")}
            onMouseLeave={() => handleMouseLeave()}
          />
          <h4>Daily Offers</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default IconGrid;
