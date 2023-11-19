import React, { useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../hoc/ContextProvider";
import DeviceTypes from "../components/DeviceTypes";
import DeviceBrands from "../components/DeviceBrands";
import DeviceList from "../components/DeviceList/DeviceList";

const Shop = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { devices, type, brand } = useContext(Context);
  useEffect(() => {
    const searchParams = {};
    if (type.activeType.id) searchParams.typeId = type.activeType.id;
    if (brand.activeBrand.id) searchParams.brandId = brand.activeBrand.id;
    setSearchParams(searchParams);
    devices.getAll(5, 1, brand.activeBrand.id, type.activeType.id);
  }, [type.activeType.id, brand.activeBrand.id]);
  return (
    <div style={{ padding: "50px 220px", display: "flex", gap: 40 }}>
      <DeviceTypes />
      <div>
        <DeviceBrands />
        <DeviceList />
      </div>
    </div>
  );
});

export default Shop;
