import { Fragment, useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
  const [cartShown, setCartShown] = useState(false);

  const showCart = () => {
    setCartShown(true);
  };

  const hideCart = () => {
    setCartShown(false);
  };

  return (
    <Fragment>
      {cartShown && <Cart onHideCart={hideCart} />}
      <Header onShowCart={showCart} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
