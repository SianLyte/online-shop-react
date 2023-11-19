import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../hoc/ContextProvider";

const DevicePage = (props) => {
  const { id } = useParams();
  const { devices: dev } = useContext(Context);
  const [device, setDevice] = useState({});
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  useEffect(() => {
    (async () => {
      setDevice(await dev.getOne(id));
    })();
  }, []);
  return (
    <>
      <div>{device.name}</div>
      <button onClick={goBack}>Назад</button>
      {device.info?.map((inf) => {
        return (
          <div key={inf.id}>
            {inf.title} {inf.description}
          </div>
        );
      })}
    </>
  );
};

export default DevicePage;
