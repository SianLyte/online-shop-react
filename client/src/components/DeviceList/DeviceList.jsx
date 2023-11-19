import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Loader2 } from "lucide-react";
import { Context } from "../../hoc/ContextProvider";
import "./DeviceList.scss";
import DeviceItem from "../DeviceItem";
const DeviceList = observer(() => {
  const { devices } = useContext(Context);
  return (
    <div className="device__list">
      {devices.isLoading ? <Loader2 /> : null}
      {devices.isError ? <p>ERROR</p> : null}
      {devices.devices
        ? devices.devices.length
          ? devices.devices.map((device) => {
              return <DeviceItem key={device.id} device={device} />;
            })
          : "По выбранным фильтрам ничего не найдено"
        : null}
    </div>
  );
});

export default DeviceList;
