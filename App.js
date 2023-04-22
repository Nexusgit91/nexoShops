import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import OrderList from "./OrderList/OrderList";
import Dress from "./ProductList/Dress";
import Books from "./ProductList/Books";
import Navibar from "./Navbar/Navbar";
import TypingAnimation from "./TypingAnimation/TypingAnimation";

import PaymentForm from "./ProductList/PaymentForm";
import Ordername from "./OrderList/Ordername";
import SignUp from "./Singup/SignUp";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import Register from "./RegisterShops/Register";
import ShopOwners from "./RegisterShops/ShopOwners";
import ProductTable from "./ProductTable/ProductTable";
import Electronics from "./ProductList/Electronics";

function App() {
  return (
    <>
      <Router>
        <Navibar />
        <Switch>
          <Route exact path="/electronics" component={Electronics} />
          <Route exact path="/producttable" component={ProductTable} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/ordername" component={Ordername} />
          <Route exact path="/" component={Dress} />
          <Route exact path="/pay" component={PaymentForm} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/shopowner" component={ShopOwners} />
          <Route exact path="/Books" component={Books} />

          <Route exact path="/OrderList" component={OrderList} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
