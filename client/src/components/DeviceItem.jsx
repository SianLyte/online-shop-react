import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, StarOff, ShoppingBasket, Loader2 } from "lucide-react";
import { Button } from "react-bootstrap";
import "./DeviceList/DeviceList.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../hoc/ContextProvider";
import { toast } from "react-toastify";
import { ratingCount as getRatingCount } from "../http/deviceAPI";
const DeviceItem = observer(({ device }) => {
  const [isLoadingBasket, setLoadingBasket] = useState();
  const [isLoadingDeleteBasket, setLoadingDeleteBasket] = useState();

  const [ratingCount, setRatingCount] = useState();
  const [inBasket, setInBasket] = useState(false);
  const [count, setCount] = useState(null);
  const { basket } = useContext(Context);
  const getRatingCoun = async (deviceId) => {
    const res = await getRatingCount(deviceId);
    setRatingCount(res.data.count);
  };
  useEffect(() => {
    getRatingCoun(device.id);
  }, []);

  useEffect(() => {
    setInBasket(false);
    basket.basket.forEach((item) => {
      if (item.deviceId === device.id) {
        setCount(item.amount);
        setInBasket(true);
      }
    });
  }, [basket.basket]);

  const addToBasket = async (deviceId) => {
    setLoadingBasket(true);
    const res = await basket.incrementDevice(deviceId);
    setLoadingBasket(false);
    if (res.statusText === "Unauthorized") {
      toast("Вы не авторизованы", {
        type: "info",
        position: "bottom-right",
      });
    }
  };

  const removeToBasket = async (deviceId) => {
    setLoadingDeleteBasket(true);
    await basket.decrementDevice(deviceId);
    setLoadingDeleteBasket(false);
  };

  return (
    <div key={device.id} className="device__item">
      <div className="device__img">
        <img src={`http://localhost:7000/${device.img}`} alt="" />
      </div>
      <div className="device__name-wrapper">
        <Link className="device__link" to={`/device/${device.id}`}>
          {device.name}
        </Link>
        <div className="device__rating-wrapper">
          {ratingCount ? (
            <>
              <Star color="orange" fill="orange" width={18} height={18} />
              <span className="device__rating">
                {device.rating % 1 === 0 ? device.rating + ".0" : device.rating}
              </span>
              <span className="device__rating-count">/ {ratingCount}</span>
            </>
          ) : (
            <>
              <StarOff color="orange" fill="orange" width={18} height={18} />
              <span className="device__rating-count">Нет отзывов</span>
            </>
          )}
        </div>
      </div>
      <div className="device__price">{device.price}Р</div>
      {inBasket ? (
        <div className="d-flex w-100 justify-content-center">
          <div className="d-flex w-100 justify-content-between align-items-center">
            <Button
              style={{ width: 50 }}
              onClick={() => removeToBasket(device.id)}
            >
              {isLoadingDeleteBasket ? <Loader2 width={18} height={18} /> : "-"}
            </Button>
            <div className="">{count}</div>
            <Button
              style={{ width: 50 }}
              onClick={() => addToBasket(device.id)}
            >
              {isLoadingBasket ? <Loader2 width={18} height={18} /> : "+"}
            </Button>
          </div>
        </div>
      ) : (
        <Button
          className="device__button"
          onClick={() => addToBasket(device.id)}
        >
          {isLoadingBasket ? (
            <Loader2 width={18} height={18} />
          ) : (
            <ShoppingBasket width={18} height={18} />
          )}
        </Button>
      )}
    </div>
  );
});

export default DeviceItem;
