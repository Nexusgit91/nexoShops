// import React from "react";
// import "./Product.css";
// const cardData = [
//   {
//     image: require("../AppleWatch.jpg"),
//     title: "Card 1",
//     description:
//       "Some quick example text to build on the card title and make up the bulk of the card's content.",
//     link: "#",
//     cta: "Go somewhere",
//   },
//   {
//     image: require("../airdopes.webp"),
//     title: "Card 2",
//     description:
//       "Some quick example text to build on the card title and make up the bulk of the card's content.",
//     link: "#",
//     cta: "Go somewhere",
//   },
//   {
//     image: require("../iphone-14.jpg"),
//     title: "Card 3",
//     description:
//       "Some quick example text to build on the card title and make up the bulk of the card's content.",
//     link: "#",
//     cta: "Go somewhere",
//   },
// ];

// const ProductPage = () => {
//   return (
//     <div className="card-group " style={{ marginTop: "20px" }}>
//       {cardData.map((card, index) => (
//         <div
//           className="card"
//           key={index}
//           style={{ border: "none", marginLeft: "25px" }}
//         >
//           <img src={card.image} alt="Card image " className=" imgui " />
//           <div className="card-body">
//             <h5 className="card-title title">{card.title}</h5>
//             <p className="card-text para">{card.description}</p>

//             <a href={card.link} className="btn btn-primary">
//               {card.cta}
//             </a>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductPage;
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Product.css";

const ProductPage = () => {
  const images = [
    { src: require("../img/AppleWatch.jpg"), name: "apple watch" },
    { src: require("../img/airdopes.webp"), name: "apple watch" },
    { src: require("../img/Galaxy-S23.jpg"), name: "apple watch" },

    { src: require("../img/iphone-14.jpg"), name: "apple watch" },

    { src: require("../img/bolt.jpg"), name: "apple watch" },
    { src: require("../img/victus.jpg"), name: "apple watch" },
    { src: require("../img/xbox.jpg"), name: "apple watch" },
    { src: require("../img/oled.jpg"), name: "apple watch" },

    { src: require("../img/cycle.webp"), name: "apple watch" },
    { src: require("../img/iphone-14.jpg"), name: "apple watch" },
    { src: require("../img/MI.jpg"), name: "apple watch" },
  ];

  return (
    <Container fluid>
      <Row>
        {images.map((image, index) => (
          <Col key={index} md={4} className="image-container">
            <img
              src={image.src}
              alt={`Product Image ${index}`}
              className="img-fluid zoom-button"
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductPage;
