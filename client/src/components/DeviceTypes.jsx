import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Context } from "../hoc/ContextProvider";
import { useSearchParams } from "react-router-dom";

const DeviceTypes = observer(() => {
  const { type } = useContext(Context);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    type.setTypes([
      { id: 1, name: "Холодильники" },
      { id: 2, name: "Смартфоны" },
      { id: 3, name: "Ноутбуки" },
      { id: 4, name: "Телевизоры" },
    ]);
    const typeId = searchParams.get("typeId");
    type.setActiveType({ id: typeId });
  }, []);
  return (
    <ListGroup style={{ width: 200 }}>
      {type.types?.map((t) => {
        return (
          <ListGroup.Item
            style={{ cursor: "pointer" }}
            key={t.id}
            active={t.id === +type.activeType.id}
            onClick={() => {
              type.setActiveType(t);
            }}
          >
            {t.name}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
});

export default DeviceTypes;
