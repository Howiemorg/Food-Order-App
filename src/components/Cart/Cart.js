import { useContext } from "react";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import useHttp from "../Hooks/use-http";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const { error, sendRequest } = useHttp();

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const removeCartItem = (id) => {
    cartCtx.removeItem(id);
  };

  const addCartItem = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const addOrder = async () => {
    const requestConfig = {
      url: "https://react-http-633e4-default-rtdb.firebaseio.com/orders.json",
      method: "POST",
      body: {
        meals: cartCtx.items,
        amount: cartCtx.totalAmount,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    sendRequest(requestConfig, () => {});

    cartCtx.removeAll();
    props.onHideCart();
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

  if (error) {
    return <Modal>Order Didn't go through</Modal>;
  }
  return (
    <Modal onClose={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={addOrder}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
