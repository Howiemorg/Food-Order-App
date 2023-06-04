import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => {
  return value.trim() === "";
};

const isFiveChar = (value) => {
  return value.trim().length === 5;
};

const Checkout = (props) => {
  const [formValid, setFormValid] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const postalRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const nameIsValid = !isEmpty(nameRef.current.value);
    const streetIsValid = !isEmpty(streetRef.current.value);
    const cityIsValid = !isEmpty(cityRef.current.value);
    const postalisValid = isFiveChar(postalRef.current.value);

    setFormValid({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postal: postalisValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalisValid;

    if (formIsValid) {
      props.onAddOrder({
        name: nameRef.current.value,
        street: streetRef.current.value,
        city: cityRef.current.value,
        postal: postalRef.current.value,
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formValid.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formValid.name && <p>Please Enter a Valid Name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formValid.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formValid.street && <p>Please Enter a Valid Street!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formValid.postal ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalRef} />
        {!formValid.name && (
          <p>Please Enter a Valid Postal! (5 Characters Long)</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formValid.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formValid.name && <p>Please Enter a Valid City!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
