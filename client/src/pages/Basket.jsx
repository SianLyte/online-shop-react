import React, { useContext } from "react";
import { Context } from "../hoc/ContextProvider";
import { observer } from "mobx-react-lite";

const Basket = observer(() => {
  const { basket } = useContext(Context);

  return (
    <div>
      {basket.basket.map((d) => {
        return (
          <div key={d.deviceId}>
            {d.device?.name} {d.device?.price}P amount = {d.amount}
          </div>
        );
      })}
    </div>
  );
});

export default Basket;
