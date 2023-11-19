import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Context } from "../hoc/ContextProvider";
import { useSearchParams } from "react-router-dom";

const DeviceBrands = observer(() => {
  const { brand } = useContext(Context);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    brand.setBrands([
      { id: 1, name: "Samsung" },
      { id: 2, name: "Apple" },
    ]);
    const brandId = searchParams.get("brandId");
    brand.setActiveBrand({ id: brandId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ListGroup
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        paddingBottom: 30,
      }}
    >
      {brand.brands?.map((b) => {
        return (
          <ListGroup.Item
            style={{ cursor: "pointer" }}
            key={b.id}
            active={b.id === +brand.activeBrand.id}
            onClick={() => {
              brand.setActiveBrand(b);
            }}
          >
            {b.name}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
});

export default DeviceBrands;
