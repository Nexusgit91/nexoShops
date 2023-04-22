import React, { useState } from "react";
import { GooglePayButton } from "@google-pay/button-react";

const PaymentForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const handlePayment = async () => {
    try {
      // Send payment information to backend
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          totalAmount,
        }),
      });
      if (!response.ok) {
        throw new Error("Payment processing failed");
      }
      // Hide the modal after payment is processed
      setShowModal(false);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleButtonClick = () => {
    // Show the modal to collect payment information
    setShowModal(true);
  };

  const handleModalSubmit = (event) => {
    event.preventDefault();
    // Validate and set payment information
    // For simplicity, we assume all fields are required and valid
    setTotalAmount(10.0); // Replace with actual payment amount
    handlePayment();
  };

  return (
    <div style={{ border: "2px solid black" }}>
      <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example",
                  gatewayMerchantId: "exampleGatewayMerchantId",
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: "12345678901234567890",
            merchantName: "Demo Merchant",
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: `${totalAmount}`,
            currencyCode: "USD",
            countryCode: "US",
          },
        }}
        onLoadPaymentData={() => {}}
        onPaymentAuthorized={() => handlePayment()}
        onPaymentDataChanged={() => {}}
        existingPaymentMethodRequired="false"
        buttonColor="black"
        buttonType="buy"
        buttonText="Buy with Google"
        onClick={() => handleButtonClick()}
      />
      {showModal && (
        <div className="modal">
          <form onSubmit={handleModalSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
