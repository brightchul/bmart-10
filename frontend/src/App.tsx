import React from "react";
import Router from "./router";
import { PopUp } from "./components/common";
import { PopUpContext, CartContext } from "./contexts";

function App(): JSX.Element {
  return (
    <div className="App">
      <PopUpContext.PopUpProvider>
        <CartContext.CartProvider>
          <Router />
        </CartContext.CartProvider>
        <PopUp />
      </PopUpContext.PopUpProvider>
    </div>
  );
}

export default App;
