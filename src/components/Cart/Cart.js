import React, { useContext, useState } from "react";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import useHttp from "../Hooks/use-http";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [submitted, setSubmitted] = useState(false);

  const { error, isLoading, sendRequest } = useHttp();
  const [showCheckout, setShowCheckout] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const removeCartItem = (id) => {
    cartCtx.removeItem(id);
  };

  const addCartItem = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderCheckout = () => {
    setShowCheckout(true);
  };

  const addOrder = async (userData) => {
    setSubmitted(false);
    const requestConfig = {
      url: "https://react-http-633e4-default-rtdb.firebaseio.com/orders.json",
      method: "POST",
      body: {
        meals: cartCtx.items,
        amount: cartCtx.totalAmount,
        user: userData,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    sendRequest(requestConfig, () => {});

    setSubmitted(true);
    cartCtx.removeAll();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removeCartItem.bind(null, item.id)}
          onAdd={addCartItem.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderCheckout}>
          Order
        </button>
      )}
    </div>
  );

  if (isLoading) {
    return <Modal>Sending order Data...</Modal>;
  }

  if (error) {
    return <Modal>Order Didn't go through </Modal>;
  }

  if (submitted) {
    return (
      <Modal onClose={props.onHideCart}>
        <p>Order Submitted</p>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
      </Modal>
    );
  }
  return (
    <Modal onClose={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <Checkout onAddOrder={addOrder} onCancel={props.onHideCart} />
      )}
      {!showCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
