import React, { useState, useEffect, FC, PropsWithChildren } from "react";

interface TableProps extends PropsWithChildren {}

const Table: FC<TableProps> = ({ children }) => {
  const items = React.Children.toArray(children);

  const radians = (deg: number) => deg * (Math.PI / 180);

  const angleStep = 360 / items.length;

  const [menuRadius, setMenuRadius] = useState(0);
  const [menuX, setMenuX] = useState(0);
  const [menuY, setMenuY] = useState(0);
  const [itemRadius, setItemRadius] = useState(0);

  useEffect(() => {
    const adjustSize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const minScreenSize = Math.min(screenWidth, screenHeight);
      const menuRadius = minScreenSize * 0.4;
      const menuX = screenWidth / 2;
      const menuY = screenHeight / 2;

      const itemRadius = menuRadius * 0.2;

      setMenuRadius(menuRadius);
      setMenuX(menuX);
      setMenuY(menuY);
      setItemRadius(itemRadius);
    };

    adjustSize();

    window.addEventListener("resize", adjustSize);

    return () => window.removeEventListener("resize", adjustSize);
  }, []);

  const checkOverlap = (itemX: number, itemY: number, otherItems: any[]) => {
    for (const otherItem of otherItems) {
      const dx = itemX - otherItem.x;
      const dy = itemY - otherItem.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < itemRadius * 2) {
        return true;
      }
    }

    return false;
  };

  const adjustItemSize = (
    itemX: number,
    itemY: number,
    otherItems: any[]
  ) => {
    let adjustedRadius = itemRadius;

    while (checkOverlap(itemX, itemY, otherItems)) {
      adjustedRadius -= 5;

      if (adjustedRadius < 10) {
        return null;
      }
    }

    return adjustedRadius;
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div
        style={{
          position: "absolute",
          top: menuY - menuRadius,
          left: menuX - menuRadius,
          width: menuRadius * 2,
          height: menuRadius * 2,
          borderRadius: "50%",
          backgroundColor: "#666",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        Table
      </div>
      {items.map((item, index) => {
        const angle = angleStep * index;
        const x = menuX + menuRadius * Math.cos(radians(angle));
        const y = menuY + menuRadius * Math.sin(radians(angle));
        const rotation = angle + 90;

        const adjustedRadius = adjustItemSize(x, y, items.slice(0, index));

        if (!adjustedRadius) {
          return null;
        }

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top: y - adjustedRadius,
              left: x - adjustedRadius,
              width:adjustedRadius * 2,
              height: adjustedRadius * 2,
              borderRadius: "50%",
              backgroundColor: "#333",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.2rem",
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default Table;
