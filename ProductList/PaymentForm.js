import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "./PaymentForm.css";
import GooglePayButton from "@google-pay/button-react";

const PaymentForm = () => {
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    // Retrieve the total price from the session cookie
    const totalPriceFromStorage = window.sessionStorage.getItem("totalPrice");
    if (totalPriceFromStorage) {
      setTotalPrice(totalPriceFromStorage);
      // Remove the total price from the session cookie
      window.sessionStorage.removeItem("totalPrice");
    }
  }, []);
  return (
    <>
      <div className="payment-form" style={{ marginTop: "200px" }}>
        <h1 style={{ marginRight: "10px" }}>Total Amount: ${totalPrice}</h1>

        <hr />
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
              totalPrice: totalPrice,
              currencyCode: "INR",
              countryCode: "IN",
            },
            shippingAddressRequired: true,
            callbackIntents: ["SHIPPING_ADDRESS", "PAYMENT_AUTHORIZATION"],
          }}
          onLoadPaymentData={(paymentRequest) => {
            console.log("Success", paymentRequest);
          }}
          onPaymentAuthorized={(paymentData) => {
            console.log("Payment Authorised Success", paymentData);
            return { transactionState: "SUCCESS" };
          }}
          onPaymentDataChanged={(paymentData) => {
            console.log("On Payment Data Changed", paymentData);
            return {};
          }}
          existingPaymentMethodRequired="false"
          buttonColor="black"
          buttonType="Buy"
        />
      </div>
      <div className="google-animation-container">
        <div className="google-animation">
          <span style={{ color: "#4285F4" }}>G</span>
          <span style={{ color: "#EA4335" }}>o</span>
          <span style={{ color: "#FBBC05" }}>o</span>
          <span style={{ color: "#4285F4" }}>g</span>
          <span style={{ color: "#34A853" }}>l</span>
          <span style={{ color: "#EA4335" }}>e</span>
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
